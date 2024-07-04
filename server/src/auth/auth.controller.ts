import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IUser, IUserLogin } from 'src/classes/users.classes';
import { User } from 'src/user/user.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('api')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: IUserLogin })
  @ApiOperation({ summary: 'Login with JWT strategy' })
  @ApiResponse({ status: 500, description: 'Save jwt token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async jwtLogin(@Body() data: IUserLogin, @Res() res: Response) {
    const { access_token } = await this.authService.login(data);
    return res.json({ statusCode: 200, message: access_token });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user profile with JWT strategy' })
  @ApiResponse({ status: 200, description: 'User profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async jwtGetProfile(
    @User() user: IUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    return res.status(200).send(user);
  }
}
