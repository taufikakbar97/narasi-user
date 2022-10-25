import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({type: 'varchar', nullable: true})
  username: string;
 
  @Column({ type: 'varchar', nullable: true })
  password: string;
}