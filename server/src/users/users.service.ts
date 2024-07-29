import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ValidationCode } from '../entities/validation_code.entity';
import { EmailValidationDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRespository: Repository<User>,
    @InjectRepository(ValidationCode)
    private readonly validationRepository: Repository<ValidationCode>,
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

  async validateUser(emailValidationDto: EmailValidationDto): Promise<User> {
    const user = await this.findByEmail(emailValidationDto.email);
    user.isVerified = true;
    await this.usersRespository.save(user);
    return user;
  }

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
