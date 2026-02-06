import { Release } from 'release/schemas/release.schema';
import { Suite } from 'suite/schemas/suite.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspace } from 'workspace/schemas/workspace.schema';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Release, (release) => release.project)
  releases: Release[];

  @OneToMany(() => Suite, (suite) => suite.project)
  suites: Suite[];

  @Column()
  workspaceId: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;

  @CreateDateColumn()
  createdAt: Date;
}
