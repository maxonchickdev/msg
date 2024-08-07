import { Injectable } from '@nestjs/common';
import { EmailConfirmationDto } from 'src/utils/dto/email-confirmation.dto';
import { UsersService } from 'src/repositories/users/users.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly usersSerice: UsersService,
    private readonly redisService: RedisService,
  ) {}

  async confirmEmail(emailConfirmationDto: EmailConfirmationDto) {
    await this.redisService.deleteValue(
      `confirmation-code-${emailConfirmationDto.email}`,
    );
    const user = await this.usersSerice.findByEmail(emailConfirmationDto.email);
    user.isVerified = true;
    await this.usersSerice.saveUser(user);
    return user;
  }
}
