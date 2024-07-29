import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidationCode } from './validation.code.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @CreateDateColumn({
    name: 'createdAt',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ name: 'isVerified', nullable: false })
  isVerified: boolean = false;

  @OneToOne(() => ValidationCode)
  @JoinColumn()
  validationCode: ValidationCode;
}
