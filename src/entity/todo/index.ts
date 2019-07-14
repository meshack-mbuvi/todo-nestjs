import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Project } from '../project';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({unique: true})
  public title: string = '';

  @Column()
  public description: string = '';

  @Column()
  public isComplete: boolean = false;

  @Column({ default: false })
  started: boolean;

  @ManyToOne(type => Project, project => project.todos)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}

export default TodoEntity;
