import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Response } from 'express'
import { HttpExceptionDto } from 'src/signup/dto/http.exception.dto'
import { PayloadDto } from './dto/payload.dto'
import { SigninUserDto } from './dto/signin.user.dto'
import { GithubAuthGuard } from './guards/github.auth.guard'
import { GoogleOAuthGuard } from './guards/google.oauth.guard'
import { JwtRefreshGuard } from './guards/jwt.refresh.guard'
import { LocalSigninGuard } from './guards/local.signin.guard'
import { SigninService } from './signin.service'

@ApiTags('signin')
@Controller('signin')
export class SigninController {
  private readonly logger = new Logger(SigninController.name);

  constructor(private readonly authService: SigninService) {}

  @Post('basic')
  @UseGuards(LocalSigninGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SigninUserDto, description: 'Sign in basic' })
  @ApiOperation({ summary: 'Local sign in' })
  @ApiOkResponse({
    description: 'Temporary token in cookies',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User not found',
    },
  })
  @ApiForbiddenResponse({
    description: 'Mail not confirmed',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.FORBIDDEN,
      message: 'Mail not confirmed',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Email or password incorrected',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Email or password incorrected',
    },
  })
  async localAuth(
    @Body() signinUserDto: SigninUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      this.logger.log('Start executing signin/basic endpoint');
      const { accessToken, refreshToken } =
        await this.authService.localAuth(signinUserDto);
        this.logger.log(`User ${JSON.stringify(signinUserDto)} is signed in successfully`);
      return res
        .cookie('access', accessToken, {
          httpOnly: true,
          path: '/',
        })
        .cookie('refresh', refreshToken, {
          httpOnly: true,
          path: '/',
        })
        .send(true);
    } catch (err) {
      this.logger.error(`User ${JSON.stringify(signinUserDto)} is not signed in`);
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }

  @UseGuards(LocalSigninGuard)
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with google provider' })
  @ApiOkResponse({
    description: 'Login success',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User not found',
    },
  })
  async googleAuth(): Promise<void> {}

  // @Get('google-redirect')
  // @UseGuards(GoogleOAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Get jwt token' })
  // @ApiOkResponse({
  //   description: 'Access token is active',
  // })
  // @ApiNotFoundResponse({
  //   description: 'User not found',
  //   type: HttpExceptionDto,
  //   example: {
  //     statusCode: HttpStatus.NOT_FOUND,
  //     message: 'User not found',
  //   },
  // })
  // async googleAuthRedirect(
  //   @Req() req: Request & { user: PayloadDto },
  //   @Res() res: Response,
  // ): Promise<void> {
  //   try {
  //     const { id } = req.user;
  //     const { accessToken, refreshToken } = await this.authService.googleAuth({
  //       id,
  //     });
  //     return res
  //       .cookie('accessToken', accessToken, {
  //         httpOnly: true,
  //         path: '/',
  //         expires: new Date(
  //           Date.now() + parseInt(process.env.JWT_ACCESS_EXPIRES_IN),
  //         ),
  //       })
  //       .cookie('refreshToken', refreshToken, {
  //         httpOnly: true,
  //         path: '/',
  //         expires: new Date(
  //           Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES_IN),
  //         ),
  //       })
  //       .redirect(process.env.CLIENT_ORIGIN + process.env.CLIENT_TO_PROFILE);
  //   } catch (err) {
  //     return res.redirect(
  //       process.env.CLIENT_ORIGIN + process.env.CLIENT_TO_REGISTRATE,
  //     );
  //   }
  // }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with github provider' })
  @ApiOkResponse({
    description: 'Login success',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User not found',
    },
  })
  async githubAuth(): Promise<void> {}

  // @Get('github-redirect')
  // @UseGuards(GithubAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Get jwt token' })
  // @ApiOkResponse({
  //   description: 'Access token is active',
  // })
  // @ApiNotFoundResponse({
  //   description: 'User not found',
  //   type: HttpExceptionDto,
  //   example: {
  //     statusCode: HttpStatus.NOT_FOUND,
  //     message: 'User not found',
  //   },
  // })
  // async githubAuthRedirect(
  //   @Req() req: Request & { user: PayloadDto },
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   try {
  //     const { id } = req.user;
  //     const { accessToken, refreshToken } = await this.authService.githubAuth({
  //       id,
  //     });
  //     return res
  //       .cookie('accessToken', accessToken, {
  //         httpOnly: true,
  //         path: '/',
  //         expires: new Date(
  //           Date.now() + parseInt(process.env.JWT_ACCESS_EXPIRES_IN),
  //         ),
  //       })
  //       .cookie('refreshToken', refreshToken, {
  //         httpOnly: true,
  //         path: '/',
  //         expires: new Date(
  //           Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES_IN),
  //         ),
  //       });
  //     // .redirect(
  //     //   this.configService
  //     //     .get<string>('CLIENT_ORIGIN')
  //     //     .concat(this.configService.get<string>('CLIENT_TO_PROFILE')),
  //     // );
  //   } catch (err) {
  //     // return res.redirect(
  //     //   this.configService
  //     //     .get<string>('CLIENT_ORIGIN')
  //     //     .concat(this.configService.get<string>('CLIENT_TO_REGISTRATE')),
  //     // );
  //   }
  // }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({
    description: 'New access token is avalible',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User not found',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid refresh token',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid refresh token',
    },
  })
  async refresh(
    @Req() req: Request & { user: PayloadDto },
    @Res() res: Response,
  ): Promise<Response> {
    try {
      this.logger.log('Start executing signin/refresh endpoint');
      const newAccessToken = await this.authService.getNewAccessToken(
        req.user.userId,
      );
      this.logger.log(`New access token is avalible for user ${req.user.userId}`);
      return res
        .cookie('access', newAccessToken, {
          httpOnly: true,
          path: '/',
        })
        .send(true);
    } catch (err) {
      this.logger.error('Error during refresh access token');
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }
}
