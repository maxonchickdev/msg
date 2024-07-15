import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'validation_codes' })
export class ValidationCode {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'code', nullable: false })
  code: string;

  @ManyToOne(() => User, (user) => user.validationCodes)
  user: User;
}
