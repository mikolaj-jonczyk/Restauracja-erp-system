import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../tasks/status.enum';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dateOfCreate: string;

  @Column()
  productList: string;

  @Column()
  status: Status;
}
