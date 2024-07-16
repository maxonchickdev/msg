import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { IUpdateUser } from '../classes/users.classes';
import { User } from './user.entity';
import { ValidationCode } from './validation_code.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
    @InjectRepository(ValidationCode)
    private validationRepository: Repository<ValidationCode>,
    private mailService: MailService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRespository.find({ relations: { code: true } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRespository.findOne({
      where: { email: email },
      relations: { code: true },
    });
  }

  async createUser(
    userDetails: User,
  ): Promise<{ statusCode: number; message: string }> {
    const user = await this.findByEmail(userDetails.email);
    if (user) {
      throw new HttpException('User exists', HttpStatus.CONFLICT);
    }

    const uuidCode = uuid();

    await this.mailService.sendMail({
      to: userDetails.email,
      message: uuidCode,
    });

    const validationCode = this.validationRepository.create({
      code: uuidCode,
    });

    await this.validationRepository.save(validationCode);

    const newUser = this.usersRespository.create({
      username: userDetails.username,
      email: userDetails.email,
      password: await bcrypt.hash(userDetails.password, 10),
      code: validationCode,
    });

    await this.usersRespository.save(newUser);

    return { statusCode: 200, message: 'Check email' };
  }

  async validateUser(
    email: string,
    code: string,
  ): Promise<{ statusCode: number; message: string }> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException('User does not exists', HttpStatus.CONFLICT);
    }
    if (!(user.code.code === code)) {
      throw new HttpException('Invalid code', HttpStatus.NOT_FOUND);
    }
    user.isVerified = true;
    await this.usersRespository.save(user);
    return { statusCode: 200, message: 'Verification successfully' };
  }

  async updateUser(
    id: string,
    updateUserDetails: IUpdateUser,
  ): Promise<{ statusCode: number; message: string }> {
    updateUserDetails.password = await bcrypt.hash(
      updateUserDetails.password,
      10,
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

  // async deleteUser(
  //   id: string,
  // ): Promise<{ statusCode: number; message: string }> {
  //   const user = await this.usersRespository.findOne({
  //     where: { id: id },
  //     relations: ['user_verified_code'],
  //   });
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   // await this.validationRepository.delete({ user: user });
  //   await this.usersRespository.delete({ id: id });
  //   return { statusCode: 200, message: 'User deleted successfully' };
  // }
}
