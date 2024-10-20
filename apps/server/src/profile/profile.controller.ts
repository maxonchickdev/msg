import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
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
import { PayloadDto } from '../login/signin/dto/payload.dto';
import { HttpExceptionDto } from '../signup/dto/http-exception.dto';
import { AvatarDto } from './dto/avatar.dto';
import { UserProfileDto } from './dto/user.profile.dto';
import { JwtMainGuard } from './guards/jwt-main.guard';
import { MaxSizeAvatarPipe } from './pipes/max-size-avatar.pipe';
import { TypeAvatarPipe } from './pipes/type-avatar.pipe';
import { ProfileService } from './profile.service';
/**
 *
 *
 * @export
 * @class ProfileController
 */
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);
  /**
   * Creates an instance of ProfileController.
   * @param {ProfileService} profileService
   * @memberof ProfileController
   */
  constructor(private readonly profileService: ProfileService) {}
  /**
   *
   *
   * @param {(Request & { user: PayloadDto })} req
   * @param {Response} res
   * @return {*}  {Promise<Response>}
   * @memberof ProfileController
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtMainGuard)
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
    @Res() res: Response
  ): Promise<Response> {
    try {
      this.logger.log(`User ${req.user.userId} requested profile`);
      const profile = await this.profileService.getUserProfile(req.user.userId);
      this.logger.log(`User ${req.user.userId} received profile`);
      return res.send(profile);
    } catch (err) {
      this.logger.error('Error during profile request');
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }
  /**
   *
   *
   * @param {(Request & { user: PayloadDto })} req
   * @param {AvatarDto} avatarDto
   * @param {Response} res
   * @return {*}
   * @memberof ProfileController
   */
  @Post('avatar')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtMainGuard)
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
    @Res() res: Response
  ) {
    try {
      this.logger.log(`User ${req.user.userId} requested to upload avatar`);
      const avatarUrl = await this.profileService.uploadAvatar(
        req.user.userId,
        avatarDto.avatar
      );
      this.logger.log(`User ${req.user.userId} uploaded avatar successfully`);
      return res.status(HttpStatus.OK).send(avatarUrl);
    } catch (err) {
      this.logger.error('Error during avatar upload');
      return res.status(500).send(`Internal server error ${err}`);
    }
  }
}
