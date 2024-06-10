import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, UpdateResult } from 'typeorm';
import { IUpdateUser, IUser, IUserData } from '../interfaces/users.interfaces';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this.usersRespository.find();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await this.usersRespository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<IUser | null> {
    return await this.usersRespository.findOneBy({ id });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createUser(userDetails: IUserData): Promise<IUser | null> {
    const checkIfExist = await this.findByUsername(userDetails.username);
    if (checkIfExist) {
      return null;
    }
    const newUser = this.usersRespository.create({
      username: userDetails.username,
      password: await this.hashPassword(userDetails.password),
    });
    return await this.usersRespository.save(newUser);
  }

  async updateUser(
    id: number,
    updateUserDetails: IUpdateUser,
  ): Promise<UpdateResult | null> {
    const pickedUser = await this.findById(id);
    if (pickedUser) {
      if (updateUserDetails.password) {
        updateUserDetails.password = await this.hashPassword(
          updateUserDetails.password,
        );
      }
      return await this.usersRespository.update(
        { id },
        { ...updateUserDetails },
      );
    }
    return null;
  }

  async deleteUser(id: number) {
    return await this.usersRespository.delete({ id });
  }
}
