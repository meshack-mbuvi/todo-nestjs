import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TodoEntity } from '../todo';
import { UserEntity } from '../user';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ default: '' })
  description: string;

  @ManyToOne(type => UserEntity, user => user.projects)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(type => TodoEntity, todo => todo.project)
  todos: TodoEntity[];
}
