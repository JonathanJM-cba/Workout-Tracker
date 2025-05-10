import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { WorkoutStatus } from "../types/workout.type";
import { User } from "./user.entity";
import { WorkoutExercise } from "./workout.exercise.entity";

//const defaultStatus: WorkoutStatus = "pendiente";

@Entity("workouts")
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "timestamp",
    nullable: false,
  })
  scheduledDate: Date;

  @Column({
    type: "varchar",
    nullable: false,
    default: "pendiente",
  })
  state: WorkoutStatus;

  @Column({
    type: "text",
  })
  note: string;

  //Se define la relación con usuario, Muchos entrenamientos pertenecen a un usuario
  @ManyToOne(() => User, (user) => user.workouts, {
    onDelete: "CASCADE",
    nullable: false,
  })
  user: User;

  //Se define la relación con la tabla intermedia
  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workout
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
    nullable: false,
    default: () => "NOW()",
  })
  updatedAt: Date;
}
