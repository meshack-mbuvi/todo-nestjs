import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Project } from '../project';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Project, project => project.user)
  projects: Project[];
}
