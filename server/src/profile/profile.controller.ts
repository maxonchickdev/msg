import { HttpCode, Res, UseGuards, Get, Controller } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { ParseRequest } from '../utils/decorators/parse-request.decorator';
import { UserProfileDto } from 'src/utils/dto/profile.dto';
import { Response } from 'express';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user profile with' })
  @ApiResponse({ status: 200, description: 'User profile' })
  @ApiResponse({ status: 404, description: 'Access token not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async jwtGetProfile(
    @ParseRequest() user: UserProfileDto,
    @Res() res: Response,
  ) {
    try {
      return res.send(user);
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }
}
