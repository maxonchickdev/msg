import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ValidationCode } from '../entities/validation_code.entity';
import { CreateUserDto } from '../users/dto/user.dto';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(User) private readonly usersRespository: Repository<User>,
    @InjectRepository(ValidationCode)
    private readonly validationRepository: Repository<ValidationCode>,
    private readonly mailService: MailService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const uuidCode = uuidv4();

    await this.mailService.sendMail(createUserDto.email, uuidCode);

    const validationCode = this.validationRepository.create({
      code: uuidCode,
    });

    await this.validationRepository.save(validationCode);

    const newUser = this.usersRespository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
      validationCode: validationCode,
    });

    await this.usersRespository.save(newUser);

    return newUser;
  }
}
