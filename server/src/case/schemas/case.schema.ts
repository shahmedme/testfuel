import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Suite } from 'suite/schemas/suite.schema';

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  suiteId: number;

  @ManyToOne(() => Suite, (suite) => suite.cases, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'suiteId' })
  suite: Suite;
}
