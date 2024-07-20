import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
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
    return await this.usersRespository.find({
      relations: { validationCode: true },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRespository.findOne({
      where: { email: email },
      relations: { validationCode: true },
    });
  }

  async createUser(userDetails: User): Promise<User> {
    const user = await this.findByEmail(userDetails.email);
    if (user) {
      throw new HttpException('User exists', HttpStatus.CONFLICT);
    }

    const uuidCode = uuidv4();

    await this.mailService.sendMail(userDetails.email, uuidCode);

    const validationCode = this.validationRepository.create({
      code: uuidCode,
    });

    await this.validationRepository.save(validationCode);

    const newUser = this.usersRespository.create({
      username: userDetails.username,
      email: userDetails.email,
      password: await bcrypt.hash(userDetails.password, 10),
      validationCode: validationCode,
    });

    await this.usersRespository.save(newUser);

    return newUser;
  }

  async validateUser(email: string, code: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    }
    if (!(user.validationCode.code === code)) {
      throw new HttpException('Invalid code', HttpStatus.CONFLICT);
    }
    user.isVerified = true;
    await this.usersRespository.save(user);
    return user;
  }

  // async updateUser(
  //   id: string,
  //   updateUserDetails: IUpdateUser,
  // ): Promise<{ statusCode: number; message: string }> {
  //   updateUserDetails.password = await bcrypt.hash(
  //     updateUserDetails.password,
  //     10,
  //   );
  //   const updateUser = await this.usersRespository.update(
  //     { id },
  //     updateUserDetails,
  //   );
  //   if (updateUser.affected > 0) {
  //     return { statusCode: 200, message: 'User updated successfully' };
  //   }
  //   return { message: 'User not found' };
  // }

  async deleteUser(id: string): Promise<User> {
    const user = await this.usersRespository.findOne({
      where: { id: id },
      relations: { validationCode: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const validationCode = await this.validationRepository.findOne({
      where: { id: user.validationCode.id },
    });
    await this.usersRespository.remove(user);
    await this.validationRepository.remove(validationCode);
    return user;
  }
}
