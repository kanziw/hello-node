import { RequestHandler, Response } from 'express'
import time from '../time'

const healthCheckMessage = '👋 Hello there?'
type TimeResponse = {
  timestamp: number
  timestamp_ms: number
  time_human: string
}

const HealthCheck = (): RequestHandler => (_, res: Response) => {
  res.send(healthCheckMessage)
}

const Time = (): RequestHandler => (_, res: Response) => {
  const now = time.now()
  res.json({
    timestamp: now.nano,
    timestamp_ms: now.milli,
    time_human: now.formatRFC3339Nano,
  })
}

export { healthCheckMessage, TimeResponse, HealthCheck, Time }
