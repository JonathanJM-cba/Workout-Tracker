import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ExerciseCategory, MuscleGroup } from "../types/exercise.type";
import { WorkoutExercise } from "./workout.exercise.entity";

@Entity("exercises")
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  category: ExerciseCategory;

  @Column({
    type: "varchar",
    nullable: false,
  })
  muscleGroup: MuscleGroup;

  //Se define la relacion con workoutsExercises
  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.exercise
  )
  workoutsExercises: WorkoutExercise[];

  @CreateDateColumn({
    type: "timestamptz",
    nullable: false,
    default: () => "NOW()",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "NOW()",
  })
  updatedAt: Date;
}
