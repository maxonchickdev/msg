import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { Response } from 'express'
import { CreateUserDto } from './dto/create.user.dto'
import { EmailConfirmationDto } from './dto/email.confirmation.dto'
import { HttpExceptionDto } from './dto/http.exception.dto'
import { ResendCodeDto } from './dto/resend.code.dto'
import { ConfirmationEmailGuard } from './guards/confirmation.email.guard'
import { ValidationUserGuard } from './guards/validate.new.user.guard'
import { RegistrationService } from './signup.service'

@ApiTags('signup')
@Controller('signup')
export class SignupController {
  private readonly logger = new Logger(SignupController.name);

  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(ValidationUserGuard)
  @ApiBody({
    type: CreateUserDto,
    description: 'Create new user',
  })
  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({
    description: 'User successfully created',
  })
  @ApiConflictResponse({
    description: 'User with the same username or email exists',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'User with the same username or email exists',
    },
  })
  @ApiNotFoundResponse({
    description: 'Incorrect email',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Incorrect email',
    },
  })
  async signupUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      this.logger.log('Start executing signup endpoint');
      const response = await this.registrationService.signupUser(createUserDto);
      this.logger.log(`User ${JSON.stringify(createUserDto)} successfully created`);
      return res.send(response);
    } catch (err) {
      this.logger.error(`Error during user creation (status: ${err.status}, message: ${err.response})`);
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }

  @Post('validation-confirmation-code')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ConfirmationEmailGuard)
  @ApiBody({
    type: EmailConfirmationDto,
    description: 'Validate confirmation code',
  })
  @ApiOperation({ summary: 'Validate confirmation code' })
  @ApiOkResponse({
    description: 'Verification confirmation code successfully',
  })
  @ApiNotFoundResponse({
    description: 'User does not exists',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User does not exists',
    },
  })
  @ApiConflictResponse({
    description: 'Invalid code',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'Invalid code',
    },
  })
  async validateConfirmationCode(
    @Body()
    emailConfirmationDto: EmailConfirmationDto,
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
        .json({ status: err.status, message: err.response });
    }
  }

  @Post('resend-confirmation-code')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ResendCodeDto, description: 'Resend confirmation code' })
  @ApiOperation({ summary: 'Resend confirmation code' })
  @ApiOkResponse({
    description: 'Confirmation code resended successfully',
  })
  @ApiNotFoundResponse({
    description: 'Incorrect email',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Incorrect email',
    },
  })
  async resendConfirmationCode(
    @Body()
    resendCodeDto: ResendCodeDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response =
        await this.registrationService.resendConfirmationCode(resendCodeDto);
      return res.send(response);
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: 200, message: 'Internal server error' });
    }
  }
}
