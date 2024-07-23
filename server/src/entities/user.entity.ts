import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidationCode } from './validation_code.entity';

@Entity({ name: 'users' })
export class User {
  @ApiPropertyOptional({ name: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ name: 'username' })
  @Column({ name: 'username', nullable: false })
  username: string;

  @ApiProperty({ name: 'email' })
  @Column({ name: 'email', nullable: false })
  email: string;

  @ApiProperty({ name: 'password' })
  @Column({ name: 'password', nullable: false })
  password: string;

  @ApiPropertyOptional({ name: 'createdAt' })
  @CreateDateColumn({
    name: 'createdAt',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ApiPropertyOptional({ name: 'isVerified', default: false })
  @Column({ name: 'isVerified', nullable: false })
  isVerified: boolean = false;

  @OneToOne(() => ValidationCode)
  @JoinColumn()
  validationCode: ValidationCode;
}
