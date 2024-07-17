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
import { IUserLogin } from 'src/classes/users.classes';
import { User } from 'src/decorators/user.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('/api/login')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  @ApiBody({ type: IUserLogin })
  @ApiOperation({ summary: 'Login with JWT strategy' })
  @ApiResponse({ status: 500, description: 'Save jwt token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async jwtLogin(@Body() data: IUserLogin, @Res() res: Response) {
    const { access_token } = await this.authService.login(data);
    return res.json({
      statusCode: 200,
      token: access_token,
      message: 'Login success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user profile with' })
  @ApiResponse({ status: 200, description: 'User profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async jwtGetProfile(@User() user, @Res() res: Response) {
    try {
      return res.status(200).json({ statusCode: 200, message: user });
    } catch (err) {
      return res.json({ statusCode: err.status, message: err.response });
    }
  }
}
