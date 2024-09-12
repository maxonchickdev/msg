import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { PayloadDto } from 'src/signin/dto/payload.dto';
import { HttpExceptionDto } from 'src/signup/dto/http.exception.dto';
import { AvatarDto } from './dto/avatar.dto';
import { UserProfileDto } from './dto/user.profile.dto';
import { Jwt2FaGuard } from './guards/jwt.2fa.guard';
import { MaxSizeAvatarPipe } from './pipes/max.size.avatar.pipe';
import { TypeAvatarPipe } from './pipes/type.avatar.pipe';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(Jwt2FaGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({
    description: 'User profile',
    type: UserProfileDto,
    example: {
      username: 'test',
      email: 'test@gmail.com',
      createdAt: '2024-09-07T08:42:13.414Z',
      updatedAt: '2024-09-07T08:44:29.146Z',
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User not found',
    },
  })
  async getUserProfile(
    @Req() req: Request & { user: PayloadDto },
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const profile = await this.profileService.getUserProfile(req.user.id);
      return res.send(profile);
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }

  @Post('avatar')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(Jwt2FaGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Add avatar' })
  @ApiOkResponse({
    description: 'true',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Image not in valid size or format',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message:
        'Validation failed (expected max size is 5 kb) | (expected file type is png or jpeg)',
    },
  })
  async uploadAvatar(
    @Req() req: Request & { user: PayloadDto },
    @UploadedFile(new MaxSizeAvatarPipe(), new TypeAvatarPipe())
    avatarDto: AvatarDto,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(
          await this.profileService.uploadAvatar(req.user.id, avatarDto.avatar),
        );
    } catch (err) {
      return res.status(500).send('Internal server error');
    }
  }
}
