import { S3Client, ListObjectsV2Command, _Object } from '@aws-sdk/client-s3'

export class ListFilesService {
  private s3: S3Client

  constructor(s3: S3Client) {
    this.s3 = s3
  }

  public async invoke(): Promise<_Object[]> {
    const params = {
      Bucket: 'storage-app',
    }
    try {
      const data = await this.s3.send(new ListObjectsV2Command(params))
      return data.Contents
    } catch (error) {
      throw new Error('Some error has been ocurred')
    }
}
