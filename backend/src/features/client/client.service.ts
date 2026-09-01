import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  differenceInCalendarDays,
  getDay,
  isEqual,
  nextDay,
  setDay,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import {
  ClientDashboardResponse,
  CurrentProgram,
  WorkoutFull,
  WorkoutWidgetRes,
} from './client.models';
import { WorkoutDay } from '../../generated/prisma/enums';
import { WorkoutSessionRecordDto } from './dto/client.dto';

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

  private async getFullClient(clientId: string) {
    return this.prisma.user.findUnique({
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
  }

  private async getClientProfile(clientId: string) {
    const clientProfile = await this.prisma.clientProfile.findUnique({
      where: {
        userId: clientId,
      },
    });

    if (!clientProfile) throw new NotFoundException();

    return clientProfile;
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
      const additionalWeekIdx = i / 7;
      const additionalWeek = program.weeks[additionalWeekIdx];

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

  private async getCurrentProgram(clientId: string) {
    const clientUser = await this.getFullClient(clientId);

    if (
      !clientUser ||
      !clientUser.clientProfile ||
      !clientUser.clientProfile.currentProgram
    )
      throw new NotFoundException();

    return clientUser.clientProfile.currentProgram;
  }

  private getCorrespondingWeekIdx(daysPassed: number) {
    if (daysPassed <= 0) return -1;

    return Math.floor(daysPassed / 7);
  }

  private async getWorkoutByWeekDay(
    program: CurrentProgram,
    weekIndex: number,
    clientProfileId: string,
    tz: string,
  ): Promise<WorkoutFull[]> {
    const week = program.weeks[weekIndex];

    const todayInUserTz = toZonedTime(new Date(), tz);
    const currentWeekDay = this.DAYS[getDay(todayInUserTz)];

    // returns array p.e. [true, false, true] if there are any existing records of this week's workouts => false, to remove it from the list
    const existingFilterResult = await Promise.all(
      week.workouts.map((w) => this.checkExistingRecord(w.id, clientProfileId)),
    );

    // filtering by the existingFilter result
    const filteredWorkouts = week.workouts.filter(
      (_, index) => existingFilterResult[index],
    );

    return filteredWorkouts.filter((workout) => workout.day === currentWeekDay);
  }

  private async getClosestWorkout(
    program: CurrentProgram,
    daysPassed: number,
    clientProfileId: string,
    tz: string,
  ): Promise<WorkoutWidgetRes> {
    const todayInUserTz = toZonedTime(new Date(), tz);
    const currentWeekDayIdx = getDay(todayInUserTz);

    const normalizedProgramWeeks = this.normalizeWeeks(program, tz);

    // sort by correct week day and day index (p.e. Monday first)
    const sortedWorkouts = normalizedProgramWeeks[
      this.getCorrespondingWeekIdx(daysPassed)
    ].workouts
      .filter((w) => this.DAYS_IDX[w.day] >= currentWeekDayIdx)
      .sort((a, b) => this.DAYS_IDX[a.day] - this.DAYS_IDX[b.day]);

    // array resulting if there are existing records (p.e. skipped workouts recorded)
    const existingFilterResult = await Promise.all(
      sortedWorkouts.map((w) =>
        this.checkExistingRecord(w.id, clientProfileId),
      ),
    );

    // final array
    const closest = sortedWorkouts.filter(
      (_, index) => existingFilterResult[index],
    );

    // if this week is empty, check next week for upcoming workouts
    if (closest.length === 0) {
      const nextWeekIdx = this.getCorrespondingWeekIdx(daysPassed) + 1;

      const nextWeekWorkout = normalizedProgramWeeks[nextWeekIdx].workouts.sort(
        (a, b) => this.DAYS_IDX[a.day] - this.DAYS_IDX[b.day],
      )[0];

      const nextWeekWorkoutDate = nextDay(
        todayInUserTz,
        this.DAYS_IDX[nextWeekWorkout.day],
      );

      const isAllowedToStart = isEqual(todayInUserTz, nextWeekWorkoutDate);

      if (nextWeekWorkout) {
        return {
          ...nextWeekWorkout,
          date: nextWeekWorkoutDate,
          isAllowedToStart,
        };
      }

      throw new NotFoundException();
    }

    if (closest[0]) {
      const closestWorkoutDate = setDay(
        todayInUserTz,
        this.DAYS_IDX[closest[0].day],
      );

      return {
        ...closest[0],
        date: closestWorkoutDate,
        isAllowedToStart: isEqual(todayInUserTz, closestWorkoutDate),
      };
    } else throw new NotFoundException();
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

  private async checkExistingRecord(workoutId: string, clientId: string) {
    const alreadyDone = await this.prisma.workoutRecord.findFirst({
      where: {
        originalWorkoutId: workoutId,
        doneByUserId: clientId,
      },
    });

    if (alreadyDone)
      return false; // for filter function
    else return true;
  }

  async getTodaysWorkout(
    clientId: string,
    tz: string,
  ): Promise<WorkoutFull | null> {
    const currentProgram = await this.getCurrentProgram(clientId);

    const todayInUserTz = toZonedTime(new Date(), tz);
    const programStartInUserTz = toZonedTime(currentProgram.startDate, tz);
    const programEndInUserTz = toZonedTime(currentProgram.endDate, tz);

    const daysUntilStart = differenceInCalendarDays(
      programStartInUserTz,
      todayInUserTz,
    );
    const daysUntilEnd = differenceInCalendarDays(
      programEndInUserTz,
      todayInUserTz,
    );

    if (daysUntilStart > 0) throw new ForbiddenException();
    else if (daysUntilEnd <= 0) throw new ForbiddenException();

    const daysPassedFromStart = differenceInCalendarDays(
      todayInUserTz,
      programStartInUserTz,
    );

    const clientProfile = await this.getClientProfile(clientId);

    const finalRes = await this.getWorkoutByWeekDay(
      currentProgram,
      this.getCorrespondingWeekIdx(daysPassedFromStart),
      clientProfile.id,
      tz,
    );

    if (finalRes.length > 0) {
      const foundWorkout = finalRes[0];

      return foundWorkout;
    } else throw new ForbiddenException();
  }

  async getUpcomingWorkout(clientId: string, tz: string) {
    const currentProgram = await this.getCurrentProgram(clientId);

    const todayInUserTz = toZonedTime(new Date(), tz);
    const programStartInUserTz = toZonedTime(currentProgram.startDate, tz);
    const programEndInUserTz = toZonedTime(currentProgram.endDate, tz);

    const daysUntilStart = differenceInCalendarDays(
      programStartInUserTz,
      todayInUserTz,
    );
    const daysUntilEnd = differenceInCalendarDays(
      programEndInUserTz,
      todayInUserTz,
    );

    if (daysUntilStart > 0) throw new ForbiddenException();
    else if (daysUntilEnd <= 0) throw new ForbiddenException();

    const daysPassedFromStart = differenceInCalendarDays(
      todayInUserTz,
      programStartInUserTz,
    );

    const clientProfile = await this.getClientProfile(clientId);

    return await this.getClosestWorkout(
      currentProgram,
      daysPassedFromStart,
      clientProfile.id,
      tz,
    );
  }

  async getDashboard(
    clientId: string,
    tz: string,
  ): Promise<ClientDashboardResponse> {
    let upcomingWorkoutWidget: WorkoutWidgetRes | null;
    try {
      upcomingWorkoutWidget = await this.getUpcomingWorkout(clientId, tz);
    } catch (err) {
      upcomingWorkoutWidget = null;
    }

    return {
      upcomingWorkoutWidget,
    };
  }

  async createWorkoutRecord(
    clientId: string,
    workoutRecord: WorkoutSessionRecordDto,
  ) {
    const clientProfile = await this.getClientProfile(clientId);

    const existingRecord = await this.prisma.workoutRecord.findFirst({
      where: {
        originalWorkoutId: workoutRecord.originalWorkoutId,
        doneByUserId: clientProfile.id,
      },
    });

    if (existingRecord) throw new ConflictException();

    return this.prisma.workoutRecord.create({
      data: {
        name: workoutRecord.name,
        day: workoutRecord.day,
        durationSec: workoutRecord.durationSec,
        exercises: this.mapExerciseRecordToPrisma(workoutRecord),
        doneByUserId: clientProfile.id,
        originalWorkoutId: workoutRecord.originalWorkoutId,
        skipped: false,
      },
    });
  }

  async createSkippedWorkoutRecord(
    clientId: string,
    skipReason: string | null,
    tz: string,
  ) {
    const clientProfile = await this.getClientProfile(clientId);

    const workoutSessionToSkip = await this.getTodaysWorkout(clientId, tz);

    if (!workoutSessionToSkip) throw new NotFoundException();

    const existingRecord = await this.prisma.workoutRecord.findFirst({
      where: {
        originalWorkoutId: workoutSessionToSkip.id,
        doneByUserId: clientProfile.id,
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
        doneByUserId: clientProfile.id,
        originalWorkoutId: workoutSessionToSkip.id,
        skipped: true,
        skipReason,
      },
    });

    return await this.getDashboard(clientId, tz);
  }
}
