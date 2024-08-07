import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Res,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailConfirmationDto } from 'src/utils/dto/email-confirmation.dto';
import { ConfirmationEmailGuard } from 'src/utils/guards/confirmation-email.guard';
import { Response } from 'express';
import { EmailConfirmationService } from './email-confirmation.service';
import { ResendCodeDto } from 'src/utils/dto/resend-code.sto';

@ApiTags('registration')
@Controller('reg')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('confirmation')
  @UseGuards(ConfirmationEmailGuard)
  @HttpCode(200)
  @ApiBody({ type: EmailConfirmationDto })
  @ApiOperation({ summary: 'Confirmation user' })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 409, description: 'Invalid code' })
  @ApiResponse({ status: 200, description: 'Verification successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async confirmationUser(
    @Body()
    emailConfirmationDto: EmailConfirmationDto,
    @Res() res: Response,
  ) {
    try {
      const response =
        await this.emailConfirmationService.confirmEmail(emailConfirmationDto);
      return res.send(response);
    } catch (err) {
      return res.send({ status: 200, message: 'Internal server error' });
    }
  }

  @Post('resend')
  @HttpCode(200)
  @ApiBody({ type: ResendCodeDto })
  @ApiOperation({ summary: 'Resend email' })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 409, description: 'Invalid code' })
  @ApiResponse({ status: 200, description: 'Verification successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async reconfirmationUser(
    @Body()
    resendCodeDto: ResendCodeDto,
    @Res() res: Response,
  ) {
    try {
      const response =
        await this.emailConfirmationService.resendMail(resendCodeDto);
      return res.send(response);
    } catch (err) {
      return res.send({ status: 200, message: 'Internal server error' });
    }
  }
}
