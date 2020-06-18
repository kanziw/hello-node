import { RequestHandler, Response } from 'express'
import time from '../../time'

const Time: RequestHandler = (_, res: Response) => {
  const now = time.now()
  res.json({
    timestamp: now.nano,
    timestamp_ms: now.milli,
    time_human: now.formatRFC3339Nano,
  })
}

export { Time }
