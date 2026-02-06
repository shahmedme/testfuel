import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from 'project/schemas/project.schema';

@Entity('releases')
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('simple-array', { nullable: true })
  suites: number[];

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.releases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;
}
