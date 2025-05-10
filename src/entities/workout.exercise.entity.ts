import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Workout } from "./workout.entity";
import { Exercise } from "./exercise.entity";

@Entity("workouts_exercises")
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
    nullable: false,
  })
  sets: number;

  @Column({
    type: "int",
    nullable: false,
  })
  reps: number;

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: true,
  })
  weightKg: number | null;

  //Se define la relación con entrenamiento
  @ManyToOne(() => Workout, (workout) => workout.workoutsExercises, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  @JoinColumn({
    name: "workoutId",
  })
  workout: Workout;

  //Se define la relación con Ejercicio
  @ManyToOne(() => Exercise, (exercise) => exercise.workoutsExercises, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  @JoinColumn({
    name: "exerciseId",
  })
  exercise: Exercise;
}
