import { ExerciseUnit } from '@core/models/training.models';
import { SelectInputOption } from '@core/models/ui.models';

export const UNITS_LABELS: SelectInputOption[] = [
  // Weight and resistance
  { label: 'KG', value: ExerciseUnit.KG },
  { label: 'LB', value: ExerciseUnit.LB },
  { label: 'Bodyweight', value: ExerciseUnit.BODYWEIGHT },
  { label: 'BW PLUS KG (Weight + added kg)', value: ExerciseUnit.BW_PLUS_KG },
  { label: 'BW MINUS KG (Weight - assist kg)', value: ExerciseUnit.BW_MINUS_KG },
  { label: '% 1RM (% of 1 repetition Max)', value: ExerciseUnit.PERCENT_1RM },
  { label: 'Plate (Weight plates)', value: ExerciseUnit.PLATE },
  { label: 'Band level (Band resistance)', value: ExerciseUnit.BAND_LEVEL },

  // Reps and structure
  { label: 'Reps', value: ExerciseUnit.REPS },
  { label: 'Reps per minute', value: ExerciseUnit.REPS_PER_MIN },
  { label: 'Round', value: ExerciseUnit.ROUND },
  { label: 'Station (Circuit stations)', value: ExerciseUnit.STATION },
  { label: 'AMRAP reps (Max reps in time)', value: ExerciseUnit.AMRAP_REPS },

  // Time and pace
  { label: 'Seconds', value: ExerciseUnit.SEC },
  { label: 'Minutes', value: ExerciseUnit.MIN },
  { label: 'Hours', value: ExerciseUnit.HOUR },
  { label: 'Work/Rest ratio', value: ExerciseUnit.WORK_REST_RATIO },
  { label: 'Pace: min/km', value: ExerciseUnit.PACE_MIN_KM },
  { label: 'Pace: min/100m', value: ExerciseUnit.PACE_MIN_100M },
  { label: 'min/500m Split', value: ExerciseUnit.SPLIT_500M },

  // Distance and pool
  { label: 'Meter', value: ExerciseUnit.METER },
  { label: 'KM', value: ExerciseUnit.KM },
  { label: 'Mile', value: ExerciseUnit.MILE },
  { label: 'Elev. Gain in meters', value: ExerciseUnit.ELEVATION_M },
  { label: 'Floors (climbed)', value: ExerciseUnit.FLOOR },
  { label: 'Laps (p.e. pool)', value: ExerciseUnit.LAP },
  { label: 'Yard', value: ExerciseUnit.YARD },

  // Energy and physiology
  { label: 'Calories', value: ExerciseUnit.CAL },
  { label: 'BPM (Heart rate)', value: ExerciseUnit.BPM },
  { label: 'Heart rate zone 1-5', value: ExerciseUnit.PULSE_ZONE },
  { label: 'VO2 max', value: ExerciseUnit.VO2MAX },
  { label: 'SPO2 (Blood oxygen, %)', value: ExerciseUnit.SPO2 },

  // Subjective metrics
  { label: 'RPE (Perceived exertion 1-10)', value: ExerciseUnit.RPE },
  { label: 'RIR (Reps in reserve)', value: ExerciseUnit.RIR },
  { label: '% of max effort', value: ExerciseUnit.PERCENT_EFFORT },

  // Specific metrics
  { label: 'km/h', value: ExerciseUnit.KMH },
  { label: 'mph', value: ExerciseUnit.MPH },
  { label: 'Cadence (Steps/strides per min)', value: ExerciseUnit.CADENCE },
  { label: 'Stroke', value: ExerciseUnit.STROKE },
  { label: 'SWOLF (Swim efficiency score)', value: ExerciseUnit.SWOLF },
  { label: 'Pulls (Arm pulls)', value: ExerciseUnit.PULLS },
  { label: 'Kicks', value: ExerciseUnit.KICKS },
  { label: 'Machine level', value: ExerciseUnit.LEVEL },
  { label: 'Score (Points / Score)', value: ExerciseUnit.SCORE },
];
