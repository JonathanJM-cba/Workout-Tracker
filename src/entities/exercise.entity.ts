import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ExerciseCategory, MuscleGroup } from "../types/exercise.type";

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
