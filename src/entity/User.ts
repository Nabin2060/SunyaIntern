import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";


export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ unique: true })
  @IsEmail()
  "email": string;

  @Column()
  @Length(6)
  "password": string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  "role": UserRole;

  @CreateDateColumn()
  "createdAt": Date;

  
}
