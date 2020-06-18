import { OK } from 'http-status-codes'
import request from 'supertest'
import app from '../../app'
import { healthCheckMessage, TimeResponse } from '../../routes'
import { formatToRFC3339Nano } from '../../time'

test('healthCheck', async () => {
  const { status, text } = await request(app).get('/')
  expect(status).toBe(OK)
  expect(text).toBe(healthCheckMessage)
})

describe('v1', () => {
  test('time', async () => {
    const { status, body } = await request(app).get('/v1/time')
    expect(status).toBe(OK)

    const { timestamp, timestamp_ms, time_human }: TimeResponse = body
    expect(time_human).toBe(formatToRFC3339Nano(new Date(timestamp_ms)))
    expect(timestamp).toBe(timestamp_ms * 1000000)
  })
})
