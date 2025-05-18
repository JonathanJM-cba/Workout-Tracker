//Se crea un DTO de workout para recibir en el body

import { WorkoutStatus } from "../types/workout.type";

export interface WorkoutDto {
  scheduledDate: Date;
  note?: string;
  exercises: {
    exerciseId: number;
    sets: number;
    reps: number;
    weightKg?: number | null;
  }[];
}

export interface UpdateWorkoutDto extends WorkoutDto {
  state: WorkoutStatus;
}
