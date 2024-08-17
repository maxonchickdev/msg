import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/registration/dto/create.user.dto';
import { User } from 'src/utils/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async createUser(user: CreateUserDTO): Promise<User> {
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

  async findByUuid(uuid: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: uuid } });
  }
}
