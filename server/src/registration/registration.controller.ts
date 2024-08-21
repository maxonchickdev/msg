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
import { CreateUserDTO } from './dto/create.user.dto';
import { EmailConfirmationDTO } from './dto/email.confirmation.dto';
import { ResendCodeDTO } from './dto/resend.code.dto';
import { ConfirmationEmailGuard } from './guards/confirmation.email.guard';
import { ValidationUserGuard } from './guards/validate.new.user.guard';
import { RegistrationService } from './registration.service';

@ApiTags('registration')
@Controller('signup')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @UseGuards(ValidationUserGuard)
  @HttpCode(200)
  @ApiBody({ type: CreateUserDTO })
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 409, description: 'User exists' })
  @ApiResponse({ status: 404, description: 'Incorrect email' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'Check mail' })
  async signupUser(@Body() createUserDto: CreateUserDTO, @Res() res: Response) {
    try {
      const response = await this.registrationService.signupUser(createUserDto);
      return res.send(response);
    } catch (err) {
      return res
        .status(err.status)
        .send({ status: err.status, message: err.response });
    }
  }

  @Post('validation-confirmation-code')
  @UseGuards(ConfirmationEmailGuard)
  @HttpCode(200)
  @ApiBody({ type: EmailConfirmationDTO })
  @ApiOperation({ summary: 'Confirmation user' })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 409, description: 'Invalid code' })
  @ApiResponse({ status: 200, description: 'Verification successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async validateConfirmationCode(
    @Body()
    emailConfirmationDto: EmailConfirmationDTO,
    @Res() res: Response,
  ) {
    try {
      const response =
        await this.registrationService.validateConfirmationCode(
          emailConfirmationDto,
        );
      return res.send(response);
    } catch (err) {
      return res.send({ status: 200, message: 'Internal server error' });
    }
  }

  @Post('resend-confirmation-code')
  @HttpCode(200)
  @ApiBody({ type: ResendCodeDTO })
  @ApiOperation({ summary: 'Resend confirmation code' })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 409, description: 'Invalid code' })
  @ApiResponse({ status: 200, description: 'Verification successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async resendConfirmationCode(
    @Body()
    resendCodeDto: ResendCodeDTO,
    @Res() res: Response,
  ) {
    try {
      const response =
        await this.registrationService.resendConfirmationCode(resendCodeDto);
      return res.send(response);
    } catch (err) {
      return res.send({ status: 200, message: 'Internal server error' });
    }
  }
}
