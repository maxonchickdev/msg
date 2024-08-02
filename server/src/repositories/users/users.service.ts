import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/utils/dto/user.dto';
import { User } from 'src/utils/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async createUser(user: CreateUserDto): Promise<User> {
    return this.usersRepository.create({
      username: user.username,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
    });
  }

  async saveUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email: email },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username: username } });
  }
}
