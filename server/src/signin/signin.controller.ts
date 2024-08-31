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
import { HttpExceptionDTO } from 'src/signup/dto/http.exception.dto';
import { ParseRequest } from '../utils/decorators/parse.request.decorator';
import { LoginUserDTO } from './dto/signin.user.dto';
import { GithubAuthGuard } from './guards/github.auth.guard';
import { GoogleOAuthGuard } from './guards/google.oauth.guard';
import { LocalSigninGuard } from './guards/local.signin.guard';
import { SigninService } from './signin.service';

@ApiTags('authentication')
@Controller('signin')
export class SigninController {
  constructor(
    private readonly authService: SigninService,
    private readonly configService: ConfigService,
  ) {}

  @Post('basic')
  @UseGuards(LocalSigninGuard)
  @HttpCode(200)
  @ApiBody({ type: LoginUserDTO, description: 'Sign in basic' })
  @ApiOperation({ summary: 'Local sign in' })
  @ApiOkResponse({
    description: 'Temporary token in cookies',
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
      const { temporaryToken } = await this.authService.localAuth(loginUserDTO);
      return res
        .cookie('temporary_token', temporaryToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'lax',
        })
        .send(true);
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
  @ApiOperation({ summary: 'Get jwt token' })
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
      const { temporaryToken } = await this.authService.googleAuth({ email });
      return res
        .cookie('temporary_token', temporaryToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'lax',
        })
        .redirect(
          this.configService
            .get<string>('CLIENT_ORIGIN')
            .concat(this.configService.get<string>('CLIENT_TO_PROFILE')), //
        );
    } catch (err) {
      return res.redirect(
        this.configService
          .get<string>('CLIENT_ORIGIN')
          .concat(this.configService.get<string>('CLIENT_TO_REGISTRATE')),
      );
    }
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign in with github provider' })
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
  async githubAuth(): Promise<void> {}

  @Get('github-redirect')
  @UseGuards(GithubAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get jwt token' })
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
  async githubAuthRedirect(
    @ParseRequest() email: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { temporaryToken } = await this.authService.githubAuth({ email });
      return res.cookie('temporary_token', temporaryToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'lax',
      });
      // .redirect(
      //   this.configService
      //     .get<string>('CLIENT_ORIGIN')
      //     .concat(this.configService.get<string>('CLIENT_TO_PROFILE')),
      // );
    } catch (err) {
      // return res.redirect(
      //   this.configService
      //     .get<string>('CLIENT_ORIGIN')
      //     .concat(this.configService.get<string>('CLIENT_TO_REGISTRATE')),
      // );
    }
  }
}
