import { Body, Controller, Get, HttpCode, Post, Request, Res, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { Response } from 'express'
import { IUserData, IUserLogin } from 'src/classes/users.classes'
import { User } from 'src/user/user.decorator'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'
import { AuthenticatedGuard } from './authenticated.guard'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('api')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('jwt-login')
  @HttpCode(200)
  @ApiBody({ type: IUserLogin })
  @ApiOperation({ summary: 'Login with JWT strategy' })
  @ApiResponse({ status: 500, description: 'Save jwt token'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  async jwtLogin(@Body() userData: IUserLogin) {
    return this.authService.jwtLogin(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwt-profile')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user profile with JWT strategy' })
  @ApiResponse({ status: 200, description: 'User profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  async jwtGetProfile(@User() user: IUserLogin) {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('session-auth')
  @HttpCode(200)
  @ApiBody({ type: IUserData })
  @ApiOperation({ summary: 'Login with Session strategy' })
  async sessionLogin(@Body() data: IUserData, @Res() res: Response) {
    try {
      const {msg, status} = await this.authService.sessionLogin(data)
      return res.json({msg: msg, status: status})
    } catch(err) {
      return {msg: 'Internal server error', status: 500}
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('session-profile')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user profile with Session strategy' })
  async sessionGetProfile(@Request() req: any) {
    console.log(req.cookies['connect.sid'])
    return req.user
  }
}
