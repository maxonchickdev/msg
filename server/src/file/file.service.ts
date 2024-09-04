import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { UserImageService } from 'src/utils/repositories/user-image/user-image.service';
import { UserService } from 'src/utils/repositories/user/user.service';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Injectable()
export class FileService {
  constructor(
    private readonly usersService: UserService,
    private readonly userImageService: UserImageService,
  ) {}

  async uploadPublicFile(
    email: string,
    dataBuffer: Buffer,
    filename: string,
  ): Promise<Prisma.ImageCreateInput> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuidv4()}-${filename}`,
      })
      .promise();

    const user = await this.usersService.findUser({ email: email });

    const profileImage = await this.userImageService.createImage({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });

    user.profileImageId = profileImage.id;

    return profileImage;
  }
}
