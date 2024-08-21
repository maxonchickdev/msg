import { Controller, Get, HttpCode, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { ParseRequest } from '../utils/decorators/parse.request.decorator';
import { JwtPayloadDTO } from './dto/jwt.payload.dto';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user profile with' })
  @ApiResponse({ status: 200, description: 'User profile' })
  @ApiResponse({ status: 404, description: 'Access token not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getUserProfile(
    @ParseRequest() user: JwtPayloadDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const userProfile = await this.profileService.getUserProfile(user.id);
      return res.send(userProfile);
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }
}
