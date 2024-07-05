import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { IUpdateUser, IUser, IUserData } from '../classes/users.classes';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this.usersRespository.find();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.usersRespository.findOne({ where: { email: email } });
  }

  async findById(id: number): Promise<IUser | null> {
    return await this.usersRespository.findOneBy({ id });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createUser(
    userDetails: IUserData,
  ): Promise<{ statusCode: number; message: string }> {
    const checkIfExist = await this.findByEmail(userDetails.email);
    if (checkIfExist) {
      throw new HttpException('User exists', HttpStatus.CONFLICT);
    }
    const newUser = this.usersRespository.create({
      username: userDetails.username,
      email: userDetails.email,
      password: await this.hashPassword(userDetails.password),
    });
    await this.usersRespository.save(newUser);
    return { statusCode: 200, message: 'User created successfully' };
  }

  async updateUser(
    id: number,
    updateUserDetails: IUpdateUser,
  ): Promise<{ statusCode: number; message: string }> {
    updateUserDetails.password = await this.hashPassword(
      updateUserDetails.password,
    );
    const updateUser = await this.usersRespository.update(
      { id },
      updateUserDetails,
    );
    if (updateUser.affected > 0) {
      return { statusCode: 200, message: 'User updated successfully' };
    }
    return { statusCode: 404, message: 'User not found' };
  }

  async deleteUser(
    id: number,
  ): Promise<{ statusCode: number; message: string }> {
    const pickedUser = await this.findById(id);
    if (pickedUser) {
      await this.usersRespository.delete({ id });
      return { statusCode: 200, message: 'User deleted successfully' };
    }
    return { statusCode: 404, message: 'User not found' };
  }
}
