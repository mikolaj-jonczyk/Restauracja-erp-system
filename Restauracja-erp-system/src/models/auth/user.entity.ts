import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from './user-type.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  type: UserType;
}
