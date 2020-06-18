import { RequestHandler, Response } from 'express'
import v1 from './v1'

const healthCheckMessage = '👋 Hello there?'
type TimeResponse = {
  timestamp: number
  timestamp_ms: number
  time_human: string
}

const HealthCheck = (): RequestHandler => (_, res: Response) => {
  res.send(healthCheckMessage)
}

export { healthCheckMessage, TimeResponse, HealthCheck, v1 }
