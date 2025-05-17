//Se crea un DTO de workout para recibir en el body

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
