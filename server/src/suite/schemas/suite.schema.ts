import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Case } from 'case/schemas/case.schema';
import { Project } from 'project/schemas/project.schema';

@Entity('suites')
export class Suite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Case, (case_) => case_.suite, { cascade: true })
  cases: Case[];

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.suites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column({ default: false })
  isArchive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
