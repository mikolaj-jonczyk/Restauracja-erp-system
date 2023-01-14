import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.enum';

@Entity()
export class Work {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  executionTime: string;

  @Column()
  status: Status;

  @Column()
  userId: string;
}
