import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucketName = process.env.AWS_PUBLIC_BUCKET_NAME;

  constructor(private readonly configService: ConfigService) {
    const s3Region = configService.get<string>('AWS_REGION');

    this.client = new S3Client({
      region: s3Region,
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    const key = `${uuidv4()}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'private',
      Metadata: {
        originalName: file.originalname,
      },
    });
    const uploadResult = await this.client.send(command);

    const url = await getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
    );

    return {
      url: url,
      key: key,
    };
  }

  async delteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.client.send(command);
  }
}
