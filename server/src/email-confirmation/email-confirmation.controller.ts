import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Res,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailConfirmationDto } from './dto/email-confirmation.dto';
import { ConfirmationEmailGuard } from './guards/confirmation-email.guard';
import { Response } from 'express';
import { EmailConfirmationService } from './email-confirmation.service';

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
  @ApiOperation({ summary: 'Confirm user' })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 409, description: 'Invalid code' })
  @ApiResponse({ status: 200, description: 'Verification successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async validationUser(
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
}
