import request from 'supertest'
import { ExpressApp as app } from '../../app'
import { HttpStatusCode } from '../../utils/http-status'

describe('/api/v1/files', () => {
  it('Must return all files correctly', async () => {
    const response = await request(new app().getApp())
      .get('/api/v1/files')
      .expect('Content-Type', /json/)

    expect(response.status).toBe(HttpStatusCode.Ok)
    expect(response.body.files).toBeDefined()
    expect(Array.isArray(response.body.files)).toBe(true)

    response.body.files.forEach((file: any) => {
      expect(file).toHaveProperty('Key')
      expect(file).toHaveProperty('LastModified')
      expect(file).toHaveProperty('ETag')
      expect(file).toHaveProperty('Size')
      expect(file).toHaveProperty('StorageClass')

      expect(typeof file.Key).toBe('string')
      expect(typeof file.LastModified).toBe('string')
      expect(typeof file.ETag).toBe('string')
      expect(typeof file.Size).toBe('number')
      expect(typeof file.StorageClass).toBe('string')
    })
  })
})
