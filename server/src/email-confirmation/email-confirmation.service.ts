import { Injectable } from '@nestjs/common';
import { EmailConfirmationDto } from 'src/utils/dto/email-confirmation.dto';
import { UsersService } from 'src/repositories/users/users.service';

@Injectable()
export class EmailConfirmationService {
  constructor(private readonly usersSerice: UsersService) {}

  async confirmEmail(emailConfirmationDto: EmailConfirmationDto) {
    const user = await this.usersSerice.findByEmail(emailConfirmationDto.email);
    user.isVerified = true;
    await this.usersSerice.saveUser(user);
    return user;
  }
}
