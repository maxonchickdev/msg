import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Injectable()
export class S3Service {
  async upload(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuidv4()}-${filename}`,
      })
      .promise();
    return uploadResult;
  }

  async delete(key: string): Promise<void> {
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Key: key,
      })
      .promise();
  }
}
