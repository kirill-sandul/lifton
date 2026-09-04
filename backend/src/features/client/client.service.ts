import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  addWeeks,
  differenceInCalendarDays,
  getDay,
  isEqual,
  isPast,
  nextDay,
  setDay,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import {
  ClientDashboardResponse,
  CurrentProgram,
  DashboardContext,
  ProgramCompletionWidgetRes,
  StreakWidgetRes,
  TargetsWidgetRes,
  WorkoutFull,
  WorkoutRecordRes,
  WorkoutWidgetRes,
  WorkoutWithDate,
} from './client.models';
import { WorkoutDay } from '../../generated/prisma/enums';
import { WorkoutSessionRecordDto } from './dto/client.dto';
import { ClientProfile, WorkoutRecord } from '../../generated/prisma/client';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  DAYS = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];

  DAYS_IDX = {
    [WorkoutDay.SUNDAY]: 0,
    [WorkoutDay.MONDAY]: 1,
    [WorkoutDay.TUESDAY]: 2,
    [WorkoutDay.WEDNESDAY]: 3,
    [WorkoutDay.THURSDAY]: 4,
    [WorkoutDay.FRIDAY]: 5,
    [WorkoutDay.SATURDAY]: 6,
  } as const;

  // -------------------
  // METHODS HELPERS

  private async getClientWithProgram(clientId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: clientId,
      },
      include: {
        clientProfile: {
          include: {
            currentProgram: {
              include: {
                weeks: {
                  include: {
                    workouts: {
                      include: {
                        exercises: {
                          include: {
                            sets: true,
                          },
                        },
                      },
                    },
                  },
                },
                targets: true,
              },
            },
          },
        },
      },
    });

    const profile = user?.clientProfile;
    if (!profile || !profile.currentProgram) {
      throw new NotFoundException(
        'Client profile or current program failed to find',
      );
    }

    return { profile, program: profile.currentProgram };
  }

  private async getDashboardContext(
    clientId: string,
  ): Promise<DashboardContext> {
    const { profile, program } = await this.getClientWithProgram(clientId);
    const records = await this.prisma.workoutRecord.findMany({
      where: { doneByClientId: profile.id, programId: program.id },
    });

    return { profile, program, records };
  }

  private async getClientRecordsSet(
    clientProfileId: string,
    programId: string,
  ): Promise<Set<string | null>> {
    const records = await this.prisma.workoutRecord.findMany({
      where: {
        doneByClientId: clientProfileId,
        programId: programId,
      },
      select: {
        originalWorkoutId: true,
      },
    });

    if (!records) throw new NotFoundException('Failed to find workout records');

    return new Set(records.map((r) => r.originalWorkoutId));
  }

  private validateProgramDates(program: CurrentProgram, tz: string) {
    const programStart = toZonedTime(program.startDate, tz);
    const programEnd = toZonedTime(program.endDate, tz);
    const todayInUserTz = toZonedTime(new Date(), tz);

    const daysUntilStart = differenceInCalendarDays(
      programStart,
      todayInUserTz,
    );
    const daysUntilEnd = differenceInCalendarDays(programEnd, todayInUserTz);

    if (daysUntilStart > 0)
      throw new ForbiddenException('Program has not started yet');
    if (daysUntilEnd <= 0)
      throw new ForbiddenException('Program has already ended');

    return {
      programStart,
      programEnd,
      daysPassed: differenceInCalendarDays(todayInUserTz, programStart),
    };
  }

  private normalizeWeeks(program: CurrentProgram, tz: string) {
    const normalizedProgramWeeks = [...program.weeks];

    const programCycleDuration = program.weeks.length * 7;

    const userStartDate = toZonedTime(program.startDate, tz);
    const userEndDate = toZonedTime(program.endDate, tz);

    const fullCoverageDays = differenceInCalendarDays(
      userEndDate,
      userStartDate,
    );

    // in days
    const missingInterval = fullCoverageDays - programCycleDuration;

    for (let i = 0; i < missingInterval; i += 7) {
      const additionalWeekIdx = Math.floor(i / 7);
      const additionalWeek = program.weeks[additionalWeekIdx];

      if (!additionalWeek) break;

      // if latest scheduled workout day goes after endDate, it will get removed
      const normalizedWorkouts = additionalWeek.workouts.filter(
        (workout) => this.DAYS_IDX[workout.day] <= program.endDate.getUTCDay(),
      );

      normalizedProgramWeeks.push({
        ...additionalWeek,
        workouts: normalizedWorkouts,
      });
    }

    return normalizedProgramWeeks;
  }

  private mapExerciseRecordToPrisma(workoutRecord: WorkoutSessionRecordDto) {
    return {
      create: workoutRecord.exercises.map((ex) => {
        return {
          name: ex.name,
          unit: ex.unit,
          order: ex.order,
          sets: {
            create: ex.sets,
          },
        };
      }),
    };
  }

  private getCorrespondingWeekIdx(daysPassed: number): number {
    if (daysPassed <= 0) return -1;

    // -1 for index
    return Math.floor(daysPassed / 7) - 1;
  }

  // ---------------------
  // BUSINESS LOGIC METHODS

  async getTodaysWorkout(
    clientId: string,
    tz: string,
  ): Promise<WorkoutFull | null> {
    const { profile, program } = await this.getClientWithProgram(clientId);

    const todayInUserTz = toZonedTime(new Date(), tz);
    const { daysPassed } = this.validateProgramDates(program, tz);

    const weekIdx = this.getCorrespondingWeekIdx(daysPassed);
    const week = program.weeks[weekIdx];
    if (!week) throw new ForbiddenException();

    const currentWeekDay = this.DAYS[getDay(todayInUserTz)];

    const recordedWorkouts = await this.getClientRecordsSet(
      profile.id,
      program.id,
    );

    // fast check if there ary any
    const todayWorkout = week.workouts.find(
      (w) => w.day === currentWeekDay && !recordedWorkouts.has(w.id),
    );

    if (!todayWorkout)
      throw new ForbiddenException('No available workout for today');

    return todayWorkout;
  }

  async getUpcomingWorkout(
    clientId: string,
    tz: string,
    context?: { profile: ClientProfile; program: CurrentProgram },
  ): Promise<WorkoutWidgetRes> {
    const { profile, program } =
      context ?? (await this.getClientWithProgram(clientId));

    const { daysPassed } = this.validateProgramDates(program, tz);

    const todayInUserTz = toZonedTime(new Date(), tz);
    const currentWeekDayIdx = getDay(todayInUserTz);

    const normalizedProgramWeeks = this.normalizeWeeks(program, tz);

    const weekIdx = this.getCorrespondingWeekIdx(daysPassed);
    const currentWeek = normalizedProgramWeeks[weekIdx];

    const recordedWorkoutsSet = await this.getClientRecordsSet(
      profile.id,
      program.id,
    );

    if (currentWeek) {
      // sort by correct week day, day index, and clear already recorded workouts
      const availableWorkouts = currentWeek.workouts
        .filter(
          (w) =>
            this.DAYS_IDX[w.day] >= currentWeekDayIdx &&
            !recordedWorkoutsSet.has(w.id),
        )
        .sort((a, b) => this.DAYS_IDX[a.day] - this.DAYS_IDX[b.day]);

      if (availableWorkouts.length > 0) {
        const closest = availableWorkouts[0];
        const closestWorkoutDate = setDay(
          todayInUserTz,
          this.DAYS_IDX[closest.day],
        );

        return {
          ...closest,
          date: closestWorkoutDate,
          isAllowedToStart: isEqual(todayInUserTz, closestWorkoutDate),
        };
      }
    }

    // if availableWorkouts is empty, check next week for upcoming workouts
    const nextWeek = normalizedProgramWeeks[weekIdx + 1];
    if (!nextWeek || nextWeek.workouts.length === 0) {
      throw new NotFoundException('No upcoming workouts found');
    }

    const nextWeekWorkout = nextWeek.workouts.sort(
      (a, b) => this.DAYS_IDX[a.day] - this.DAYS_IDX[b.day],
    )[0];

    const nextWeekWorkoutDate = nextDay(
      todayInUserTz,
      this.DAYS_IDX[nextWeekWorkout.day],
    );

    if (!nextWeekWorkout)
      throw new NotFoundException('No upcoming workouts found');

    return {
      ...nextWeekWorkout,
      date: nextWeekWorkoutDate,
      isAllowedToStart: isEqual(todayInUserTz, nextWeekWorkoutDate),
    };
  }

  async getSchedule(
    clientId: string,
    tz: string,
    programContext?: CurrentProgram,
  ): Promise<WorkoutWithDate[]> {
    const program =
      programContext ?? (await this.getClientWithProgram(clientId)).program;

    const normalizedWeeks = this.normalizeWeeks(program, tz);

    const programStartInUserTz = toZonedTime(program.startDate, tz);

    return normalizedWeeks.flatMap((week, weekIdx) =>
      week.workouts.map((workout) => {
        const weekOffset = addWeeks(programStartInUserTz, weekIdx + 1);
        const workoutDate = setDay(weekOffset, this.DAYS_IDX[workout.day]);

        return {
          ...workout,
          date: workoutDate,
        };
      }),
    );
  }

  async getProgramCompletion(
    clientId: string,
    tz: string,
    context?: DashboardContext,
  ): Promise<ProgramCompletionWidgetRes> {
    const { program, records } =
      context ?? (await this.getDashboardContext(clientId));

    const schedule = await this.getSchedule(clientId, tz, program);

    const recordsMap = new Map<string | null, WorkoutRecord>(
      records.map((record) => [record.originalWorkoutId, record]),
    );

    let workoutsCompleted = 0;
    let workoutsSkipped = 0;
    let workoutsLeft = 0;

    for (const workout of schedule) {
      const correspondingRecord = recordsMap.get(workout.id);

      if (correspondingRecord) {
        if (correspondingRecord.skipped) workoutsSkipped++;
        else workoutsCompleted++;
      } else if (!isPast(workout.date)) workoutsLeft++;
    }

    const completionPercentage = Math.round(
      (workoutsCompleted / schedule.length) * 100,
    );

    const { daysPassed } = this.validateProgramDates(program, tz);

    const weeksPassed = Math.floor(daysPassed / 7);
    const daysOffset = daysPassed % 7;

    const weeksTotal = this.normalizeWeeks(program, tz).length;

    return {
      workoutsCompleted,
      workoutsLeft,
      workoutsSkipped,
      completionPercentage,
      weeksPassed,
      daysOffset,
      weeksTotal,
    };
  }

  async getStreak(
    clientId: string,
    tz: string,
    context?: DashboardContext,
  ): Promise<StreakWidgetRes> {
    const { profile, program, records } =
      context ?? (await this.getDashboardContext(clientId));

    const normalizedWeeks = this.normalizeWeeks(program, tz);

    const { daysPassed } = this.validateProgramDates(program, tz);
    const currentWeekIdx = this.getCorrespondingWeekIdx(daysPassed);

    const schedule = await this.getSchedule(clientId, tz);

    let streakCount = 0;

    const recordedWorkoutsSet = await this.getClientRecordsSet(
      profile.id,
      program.id,
    );

    normalizedWeeks.forEach((week, weekIdx) => {
      // limiting by the current week (you can't do workouts in the future)
      if (weekIdx > currentWeekIdx) return;

      const hasCompletedWorkout = week.workouts.some((w) =>
        recordedWorkoutsSet.has(w.id),
      );

      // at least one workout per a week is enough to keep the streak
      if (hasCompletedWorkout) streakCount++;
      else streakCount = 0;
    });

    const recordsMap = new Map<string | null, WorkoutRecord>(
      records.map((r) => [r.originalWorkoutId, r]),
    );

    const workoutsSkipped = schedule.reduce((acc, workout) => {
      const correspondingRecord = recordsMap.get(workout.id);

      if (
        correspondingRecord?.skipped ||
        (!correspondingRecord && isPast(workout.date))
      )
        return acc + 1;

      return acc;
    }, 0);

    return {
      streakWeeks: streakCount,
      workoutsSkipped,
    };
  }

  async getTargets(
    clientId: string,
    programContext?: CurrentProgram,
  ): Promise<TargetsWidgetRes> {
    const program =
      programContext ?? (await this.getDashboardContext(clientId)).program;

    return {
      targets: program.targets.map((target) => {
        const range = target.targetValue - target.initialValue;
        const relativeCp =
          ((target.currentValue - target.initialValue) / range) * 100;

        return {
          ...target,
          completionPercentage: parseInt(relativeCp.toFixed(1)),
        };
      }),
    };
  }

  // -----------------------
  // DASHBOARD AGGREGATOR

  async getDashboard(
    clientId: string,
    tz: string,
  ): Promise<ClientDashboardResponse> {
    const dashboardContext = await this.getDashboardContext(clientId);

    const [
      upcomingWorkoutResult,
      scheduleResult,
      programCompletionResult,
      streakResult,
      targetsResult,
    ] = await Promise.allSettled([
      this.getUpcomingWorkout(clientId, tz, dashboardContext),
      this.getSchedule(clientId, tz, dashboardContext.program),
      this.getProgramCompletion(clientId, tz, dashboardContext),
      this.getStreak(clientId, tz, dashboardContext),
      this.getTargets(clientId, dashboardContext.program),
    ]);

    const upcomingWorkoutWidget =
      upcomingWorkoutResult.status === 'fulfilled'
        ? upcomingWorkoutResult.value
        : null;

    const scheduleWidget =
      scheduleResult.status === 'fulfilled' ? scheduleResult.value : null;

    const completionWidget =
      programCompletionResult.status === 'fulfilled'
        ? programCompletionResult.value
        : null;

    const targetsWidget =
      targetsResult.status === 'fulfilled' ? targetsResult.value : null;

    const streakWidget =
      streakResult.status === 'fulfilled' ? streakResult.value : null;

    return {
      upcomingWorkoutWidget,
      scheduleWidget,
      completionWidget,
      streakWidget,
      targetsWidget,
    };
  }

  // -----------------
  // MUTATIONS

  private async recalculateTargets(clientId: string, record: WorkoutRecordRes) {
    if (!record) return;

    const { program } = await this.getClientWithProgram(clientId);

    const updatePromises = program.targets.map(async (target) => {
      let currentTargetValue = target.currentValue;

      record.exercises.forEach((exercise) => {
        const validSets = exercise.sets.filter((set) => !set.skipped);

        if (validSets.length > 0) {
          const biggestExecutedValue = Math.max(
            ...validSets.map((s) => s.executedValue),
          );

          if (biggestExecutedValue > currentTargetValue) {
            currentTargetValue = biggestExecutedValue;
          }
        }
      });

      if (currentTargetValue !== target.currentValue) {
        await this.prisma.target.update({
          where: {
            id: target.id,
          },
          data: {
            currentValue: currentTargetValue,
          },
        });
      }
    });

    return await Promise.all(updatePromises);
  }

  async createWorkoutRecord(
    clientId: string,
    workoutRecord: WorkoutSessionRecordDto,
  ) {
    const { profile } = await this.getClientWithProgram(clientId);

    const existingRecord = await this.prisma.workoutRecord.findFirst({
      where: {
        originalWorkoutId: workoutRecord.originalWorkoutId,
      },
    });

    if (existingRecord) throw new ConflictException();

    const record: WorkoutRecordRes = await this.prisma.workoutRecord.create({
      data: {
        name: workoutRecord.name,
        day: workoutRecord.day,
        durationSec: workoutRecord.durationSec,
        doneByClientId: profile.id,
        originalWorkoutId: workoutRecord.originalWorkoutId,
        programId: profile.trainingProgramId,
        skipped: false,
        exercises: this.mapExerciseRecordToPrisma(workoutRecord),
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    await this.recalculateTargets(clientId, record);

    return record;
  }

  async createSkippedWorkoutRecord(
    clientId: string,
    skipReason: string | null,
    tz: string,
  ) {
    const { profile } = await this.getClientWithProgram(clientId);

    const workoutSessionToSkip = await this.getTodaysWorkout(clientId, tz);

    if (!workoutSessionToSkip) throw new NotFoundException();

    const existingRecord = await this.prisma.workoutRecord.findFirst({
      where: {
        originalWorkoutId: workoutSessionToSkip.id,
        doneByClientId: profile.id,
      },
    });

    if (existingRecord) throw new ConflictException();

    await this.prisma.workoutRecord.create({
      data: {
        name: workoutSessionToSkip.name ?? '',
        day: workoutSessionToSkip.day,
        durationSec: 0,
        exercises: {
          create: [],
        },
        doneByClientId: profile.id,
        originalWorkoutId: workoutSessionToSkip.id,
        programId: profile.trainingProgramId,
        skipped: true,
        skipReason,
      },
    });

    return await this.getDashboard(clientId, tz);
  }
}
