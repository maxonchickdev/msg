import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDTO } from './dto/create.user.dto';
import { EmailConfirmationDTO } from './dto/email.confirmation.dto';
import { HttpExceptionDTO } from './dto/http.exception.dto';
import { ResendCodeDTO } from './dto/resend.code.dto';
import { ConfirmationEmailGuard } from './guards/confirmation.email.guard';
import { ValidationUserGuard } from './guards/validate.new.user.guard';
import { RegistrationService } from './registration.service';

@ApiTags('registration')
@Controller('signup')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(ValidationUserGuard)
  @ApiBody({
    type: CreateUserDTO,
    description: 'Create new user',
  })
  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({
    description: 'User successfully created',
  })
  @ApiConflictResponse({
    description: 'User with the same username or email exists',
    type: HttpExceptionDTO,
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'User with the same username or email exists',
    },
  })
  @ApiNotFoundResponse({
    description: 'Incorrect email',
    type: HttpExceptionDTO,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Incorrect email',
    },
  })
  async signupUser(
    @Body() createUserDto: CreateUserDTO,
    @Res() res: Response,
  ): Promise<Response> {
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
  @HttpCode(HttpStatus.OK)
  @UseGuards(ConfirmationEmailGuard)
  @ApiBody({
    type: EmailConfirmationDTO,
    description: 'Validate confirmation code',
  })
  @ApiOperation({ summary: 'Validate confirmation code' })
  @ApiOkResponse({
    description: 'Verification confirmation code successfully',
  })
  @ApiNotFoundResponse({
    description: 'User does not exists',
    type: HttpExceptionDTO,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User does not exists',
    },
  })
  @ApiConflictResponse({
    description: 'Invalid code',
    type: HttpExceptionDTO,
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'Invalid code',
    },
  })
  async validateConfirmationCode(
    @Body()
    emailConfirmationDto: EmailConfirmationDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response =
        await this.registrationService.validateConfirmationCode(
          emailConfirmationDto,
        );
      return res.send(response);
    } catch (err) {
      return res
        .status(err.status)
        .send({ status: err.status, message: err.response });
    }
  }

  @Post('resend-confirmation-code')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ResendCodeDTO, description: 'Resend confirmation code' })
  @ApiOperation({ summary: 'Resend confirmation code' })
  @ApiOkResponse({
    description: 'Confirmation code resended successfully',
  })
  @ApiNotFoundResponse({
    description: 'Incorrect email',
    type: HttpExceptionDTO,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Incorrect email',
    },
  })
  async resendConfirmationCode(
    @Body()
    resendCodeDto: ResendCodeDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response =
        await this.registrationService.resendConfirmationCode(resendCodeDto);
      return res.send(response);
    } catch (err) {
      return res.send({ status: 200, message: 'Internal server error' });
    }
  }
}
