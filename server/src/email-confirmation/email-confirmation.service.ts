import { Injectable } from '@nestjs/common';
import { RegistrationService } from 'src/registration/registration.service';
import { EmailConfirmationDto } from './dto/email-confirmation.dto';

@Injectable()
export class EmailConfirmationService {
  constructor(private readonly registrationService: RegistrationService) {}

  async confirmEmail(emailConfirmationDto: EmailConfirmationDto) {
    const user = await this.registrationService.findByEmail(
      emailConfirmationDto.email,
    );
    user.isVerified = true;
    await this.registrationService.saveUser(user);
    return user;
  }
}
