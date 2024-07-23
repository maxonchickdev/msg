import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'validation_codes' })
export class ValidationCode {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'code', nullable: false })
  code: string;
}
