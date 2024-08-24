import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local.auth.guard';
import { HttpExceptionDTO } from 'src/registration/dto/http.exception.dto';
import { ParseRequest } from '../utils/decorators/parse.request.decorator';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.user.dto';
import { GoogleOAuthGuard } from './guards/google.oauth.guard';

@ApiTags('authentication')
@Controller('signin')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('basic')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiBody({ type: LoginUserDTO, description: 'Sign in basic' })
  @ApiOperation({ summary: 'Login JWT strategy' })
  @ApiOkResponse({
    description: 'Access token is active',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDTO,
    example: {
      statusCode: 404,
      message: 'User not found',
    },
  })
  @ApiForbiddenResponse({
    description: 'Mail not confirmed',
    type: HttpExceptionDTO,
    example: {
      statusCode: 403,
      message: 'Mail not confirmed',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Email or password incorrected',
    type: HttpExceptionDTO,
    example: {
      statusCode: 401,
      message: 'Email or password incorrected',
    },
  })
  async localAuth(
    @Body() loginUserDTO: LoginUserDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { accessToken } = await this.authService.localAuth(loginUserDTO);
      return res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'lax',
        })
        .send('Login success');
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign in with google provider' })
  @ApiOkResponse({
    description: 'Login success',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDTO,
    example: {
      statusCode: 404,
      message: 'User not found',
    },
  })
  async googleAuth(): Promise<void> {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({
    description: 'Access token is active',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDTO,
    example: {
      statusCode: 404,
      message: 'User not found',
    },
  })
  async googleAuthRedirect(
    @ParseRequest() email: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const { accessToken } = await this.authService.googleAuth({ email });
      return res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'lax',
        })
        .redirect(
          this.configService
            .get<string>('CLIENT_ORIGIN')
            .concat(this.configService.get<string>('CLIENT_TO_PROFILE')),
        );
    } catch (err) {
      return res.redirect(
        this.configService
          .get<string>('CLIENT_ORIGIN')
          .concat(this.configService.get<string>('CLIENT_TO_REGISTRATE')),
      );
    }
  }
}
