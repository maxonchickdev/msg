import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidationCode } from 'src/users/validation_code.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => ValidationCode, (validationCode) => validationCode.user)
  validationCodes: ValidationCode[];
}
