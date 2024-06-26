import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({name: 'email', nullable: false})
  email: string

  @Column({ name: 'password', nullable: false })
  password: string;
}
