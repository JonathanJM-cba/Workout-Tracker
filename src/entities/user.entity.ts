import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Workout } from "./workout.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true,
  })
  password: string;

  //Se define la relación con los entrenamientos, un usuario puede tener uno o muchos entrenamientos
  @OneToMany(() => Workout, (workout) => workout.user)
  workouts: Workout[];

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
