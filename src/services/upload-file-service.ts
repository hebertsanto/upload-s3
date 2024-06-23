import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3'
import { Logger } from 'winston'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'


export class UploadFileService {
  private s3: S3Client
  private bucketName: string
  private logger: Logger

  constructor(s3Client: S3Client, bucketName: string, logger: Logger) {
    this.s3 = s3Client
    this.bucketName = bucketName
    this.logger = logger
  }

  public async invoke(
    file: Express.Multer.File,
  ): Promise<PutObjectCommandOutput> {
    if (!file) {
      throw new Error('Provide a file')
    }

    const params = {
      Bucket: this.bucketName,
      Key: file.originalname,
      Body: file.buffer,
    }

    try {
      const command = new PutObjectCommand(params)
      return await this.s3.send(command)
    } catch (error) {
      this.logger.error('Error uploading file:', error)
      throw new Error('An error occurred while uploading the file')
    }
}
}