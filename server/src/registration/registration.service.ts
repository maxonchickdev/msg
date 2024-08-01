import { Injectable } from '@nestjs/common';
import { User } from '../utils/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/repositories/users/users.service';
import { ConfirmationCodeService } from 'src/repositories/confirmation-code/confirmation-code.service';
import { CreateUserDto } from 'src/utils/dto/user.dto';
import { PayloadDto } from 'src/utils/dto/payload.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly confirmationCodeService: ConfirmationCodeService,
    private readonly mailService: MailService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const code = uuidv4();

    await this.mailService.sendMail({
      to: createUserDto.email,
      subject: 'Email from MESSANGER',
      text: 'Your email confirmation code',
      value: code,
    });

    const confirmationCode =
      await this.confirmationCodeService.createConfirmationCode(code);

    await this.confirmationCodeService.saveConfirmationCode(confirmationCode);

    const newUser = await this.usersService.createUser(
      {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
      },
      confirmationCode,
    );

    await this.usersService.saveUser(newUser);

    return newUser;
  }

  async createGoogleUser(email: string): Promise<PayloadDto> {
    const pass = uuidv4();

    await this.mailService.sendMail({
      to: email,
      subject: 'Email from MESSANGER',
      text: 'Your temporary password',
      value: pass,
    });

    const user = await this.usersService.createUser({
      username: email.split('@')[0],
      email: email,
      password: await bcrypt.hash(pass, 10),
    });

    user.isVerified = true;

    await this.usersService.saveUser(user);

    const payload: PayloadDto = {
      id: user.id,
      email: user.email,
    };

    return payload;
  }
}
