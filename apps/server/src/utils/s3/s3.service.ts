import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
/**
 *
 *
 * @export
 * @class S3Service
 */
@Injectable()
export class S3Service {
  private client: S3Client;
  private readonly bucketName = this.configService.get<string>('s3.bucketName');
  /**
   * Creates an instance of S3Service.
   * @param {ConfigService} configService
   * @memberof S3Service
   */
  constructor(private readonly configService: ConfigService) {
    const s3Region = this.configService.get<string>('s3.region');

    this.client = new S3Client({
      region: s3Region,
      credentials: {
        accessKeyId: this.configService.get<string>('s3.accessKey'),
        secretAccessKey: this.configService.get<string>('s3.secretKey'),
      },
      forcePathStyle: true,
    });
  }
  /**
   *
   *
   * @param {string} originalname
   * @param {Buffer} buffer
   * @param {string} mimetype
   * @return {*}  {Promise<{ url: string; key: string }>}
   * @memberof S3Service
   */
  async uploadFile(
    originalname: string,
    buffer: Buffer,
    mimetype: string
  ): Promise<{ url: string; key: string }> {
    const key = `${uuidv4()}`;
    new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'private',
      Metadata: {
        originalName: originalname,
      },
    });

    const url = await getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })
    );

    return {
      url: url,
      key: key,
    };
  }
  /**
   *
   *
   * @param {string} key
   * @return {*}  {Promise<void>}
   * @memberof S3Service
   */
  async delteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.client.send(command);
  }
}
