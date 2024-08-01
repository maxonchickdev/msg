import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'confirmation_codes' })
export class ConfirmationCode {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'code', nullable: true })
  code: string;
}
