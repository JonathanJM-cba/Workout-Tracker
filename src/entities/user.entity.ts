import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
