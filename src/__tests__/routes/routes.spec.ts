import axios from 'axios'
import { OK } from 'http-status-codes'
import request from 'supertest'
import createApp from '../../app'
import config, { Config } from '../../config'
import { healthCheckMessage, TimeResponse } from '../../routes'
import { MSAResponse } from '../../routes/v1/msa'
import { formatToRFC3339Nano } from '../../time'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
afterEach(() => jest.clearAllMocks())

test('healthCheck', async () => {
  const { status, text } = await request(createApp(config)).get('/')
  expect(status).toBe(OK)
  expect(text).toBe(healthCheckMessage)
})

describe('v1', () => {
  it('time', async () => {
    const { status, body } = await request(createApp(config)).get('/v1/time')
    expect(status).toBe(OK)

    const { timestamp, timestamp_ms, time_human }: TimeResponse = body
    expect(time_human).toBe(formatToRFC3339Nano(new Date(timestamp_ms)))
    expect(timestamp).toBe(timestamp_ms * 1000000)
  })

  describe('msa', () => {

    it('do not request to target', async () => {
      const { status, body } = await request(createApp(config)).get('/v1/msa')
      expect(status).toBe(OK)

      const { name, history } = body as MSAResponse

      expect(name).toBe(config.SERVICE_NAME)
      expect(history).toBeInstanceOf(Array)
      expect(history!.length).toBe(1)
    })

    describe('header propagation', () => {
      const TARGET_HOST = 'virtual'
      const mockRes: MSAResponse = { name: TARGET_HOST, headers: { mock: 'true' } }

      it('wo/ header prefix options', async () => {
        const mockedConfig: Config = { ...config, TARGET_HOST }
        mockedAxios.get.mockResolvedValueOnce({ data: { ...mockRes, history: [ mockRes ] } })

        const { body } = await request(createApp(mockedConfig)).get('/v1/msa')

        const [ [ targetUrl, calledAxiosOption ] ] = mockedAxios.get.mock.calls
        expect(targetUrl).toBe(`http://${TARGET_HOST}/v1/msa`)
        expect(calledAxiosOption!.headers).toEqual({})

        const { history } = body as MSAResponse
        expect(history![ 1 ]).toEqual(mockRes)
      })

      it('w/ header prefix options', async () => {
        const HEADER_PREFIXES_FOR_PROPAGATION = [ 'kanziw' ]
        const TEST_HEADER_KEY = 'Kanziw-Test-Header'
        const TEST_HEADER_VALUE = 'reese'

        const mockedConfig: Config = { ...config, TARGET_HOST, HEADER_PREFIXES_FOR_PROPAGATION }
        mockedAxios.get.mockResolvedValueOnce({ data: { ...mockRes, history: [ mockRes ] } })

        const { body } = await request(createApp(mockedConfig))
          .get('/v1/msa')
          .set(TEST_HEADER_KEY, TEST_HEADER_VALUE)

        const [ [ , calledAxiosOption ] ] = mockedAxios.get.mock.calls
        expect(calledAxiosOption!.headers).toEqual({
          // Express handle header key as lower case
          [ TEST_HEADER_KEY.toLowerCase() ]: TEST_HEADER_VALUE,
        })

        const { history } = body as MSAResponse
        expect(history![ 1 ]).toEqual(mockRes)
      })
    })
  })
})
