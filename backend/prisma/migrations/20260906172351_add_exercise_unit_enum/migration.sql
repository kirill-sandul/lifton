-- CreateEnum
CREATE TYPE "ExerciseUnit" AS ENUM ('KG', 'LB', 'BODYWEIGHT', 'BW_PLUS_KG', 'BW_MINUS_KG', 'PERCENT_1RM', 'PLATE', 'BAND_LEVEL', 'REPS', 'REPS_PER_MIN', 'ROUND', 'STATION', 'AMRAP_REPS', 'SEC', 'MIN', 'HOUR', 'WORK_REST_RATIO', 'PACE_MIN_KM', 'PACE_MIN_100M', 'SPLIT_500M', 'METER', 'KM', 'MILE', 'ELEVATION_M', 'FLOOR', 'LAP', 'YARD', 'CAL', 'BPM', 'PULSE_ZONE', 'VO2MAX', 'SPO2', 'RPE', 'RIR', 'PERCENT_EFFORT', 'KMH', 'MPH', 'CADENCE', 'STROKE', 'SWOLF', 'PULLS', 'KICKS', 'LEVEL', 'SCORE');

-- AlterTable
ALTER TABLE "Exercise"
  ALTER COLUMN "unit" TYPE "ExerciseUnit"
  USING UPPER("unit")::"ExerciseUnit";

ALTER TABLE "ExerciseRecord"
  ALTER COLUMN "unit" TYPE "ExerciseUnit"
  USING UPPER("unit")::"ExerciseUnit";

ALTER TABLE "Target"
  ALTER COLUMN "unit" TYPE "ExerciseUnit"
  USING UPPER("unit")::"ExerciseUnit";