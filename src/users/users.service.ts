import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { IUpdateUser, IUser, IUserData } from '../interfaces/users.interfaces'
import { User } from './user.entity'

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

  async createUser(
    userDetails: IUserData,
  ): Promise<{ msg: string; status: number }> {
    const checkIfExist = await this.findByUsername(userDetails.username);
    if (checkIfExist) {
      return { msg: 'User exists', status: 409 };
    }
    const newUser = this.usersRespository.create({
      username: userDetails.username,
      password: await this.hashPassword(userDetails.password),
    });
    await this.usersRespository.save(newUser);
    return { msg: 'User created successfully', status: 200 };
  }

  async updateUser(
    id: number,
    updateUserDetails: IUpdateUser,
  ): Promise<{ msg: string; status: number }> {
    updateUserDetails.password = await this.hashPassword(updateUserDetails.password)
    const updateUser = await this.usersRespository.update({id}, updateUserDetails)
    if(updateUser.affected > 0) {
      return { msg: 'User updated successfully', status: 200 };
    }
    return { msg: 'User not found', status: 404 };
  }

  async deleteUser(id: number): Promise<{ msg: string; status: number }> {
    const pickedUser = await this.findById(id);
    if (pickedUser) {
      await this.usersRespository.delete({ id });
      return { msg: 'User deleted successfully', status: 200 };
    }
    return { msg: 'User not found', status: 404 };
  }
}
