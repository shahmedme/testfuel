import { Project } from 'project/schemas/project.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.schema';

@Entity('workspaces')
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Member, (member) => member.workspace, { cascade: true })
  members: Member[];

  @OneToMany(() => Project, (project) => project.workspace)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;
}
