import { OK } from 'http-status-codes'
import request from 'supertest'
import createApp from '../../app'
import config from '../../config'
import { healthCheckMessage, TimeResponse } from '../../routes'
import { MSAResponse } from '../../routes/v1/msa'
import { formatToRFC3339Nano } from '../../time'

test('healthCheck', async () => {
  const { status, text } = await request(createApp(config)).get('/')
  expect(status).toBe(OK)
  expect(text).toBe(healthCheckMessage)
})

describe('v1', () => {
  test('time', async () => {
    const { status, body } = await request(createApp(config)).get('/v1/time')
    expect(status).toBe(OK)

    const { timestamp, timestamp_ms, time_human }: TimeResponse = body
    expect(time_human).toBe(formatToRFC3339Nano(new Date(timestamp_ms)))
    expect(timestamp).toBe(timestamp_ms * 1000000)
  })

  describe('msa', () => {
    test('do not request to target', async () => {
      const { status, body } = await request(createApp(config)).get('/v1/msa')
      expect(status).toBe(OK)

      const { name, history } = body as MSAResponse

      expect(name).toBe(config.SERVICE_NAME)
      expect(history).toBeInstanceOf(Array)
      expect(history!.length).toBe(1)
    })
  })
})
