import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { EmailConfirmationDTO } from './dto/email.confirmation.dto';
import { ResendCodeDTO } from './dto/resend.code.dto';
import { EmailConfirmationService } from './email.confirmation.service';
import { ConfirmationEmailGuard } from './guards/confirmation.email.guard';

@ApiTags('registration')
@Controller('reg')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('confirmation')
  @UseGuards(ConfirmationEmailGuard)
  @HttpCode(200)
  @ApiBody({ type: EmailConfirmationDTO })
  @ApiOperation({ summary: 'Confirmation user' })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 409, description: 'Invalid code' })
  @ApiResponse({ status: 200, description: 'Verification successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async confirmationUser(
    @Body()
    emailConfirmationDto: EmailConfirmationDTO,
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
  @ApiBody({ type: ResendCodeDTO })
  @ApiOperation({ summary: 'Resend email' })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 409, description: 'Invalid code' })
  @ApiResponse({ status: 200, description: 'Verification successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async reconfirmationUser(
    @Body()
    resendCodeDto: ResendCodeDTO,
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
