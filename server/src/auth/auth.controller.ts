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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local.auth.guard';
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
  @ApiBody({ type: LoginUserDTO })
  @ApiOperation({ summary: 'Login JWT strategy' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Mail not confirmed' })
  @ApiResponse({ status: 404, description: 'Email or password incorrected' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'Login success' })
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
  @ApiOperation({ summary: 'Try to login with google provider' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async googleAuth(): Promise<void> {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Login success' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
