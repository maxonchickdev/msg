import { HttpCode, Res, UseGuards, Get, Controller } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { ParseRequest } from '../utils/decorators/parse-request.decorator';
import { Response } from 'express';
import { JwtDto } from 'src/utils/dto/jwt.dto';
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
  async jwtGetProfile(@ParseRequest() user: JwtDto, @Res() res: Response) {
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
