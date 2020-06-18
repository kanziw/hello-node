import Express from 'express'
import { Config } from './config'
import { HealthCheck, v1Routes } from './routes'
import { Application } from './types'

const createApp = (config: Config): Application => {
  const app = Express()
  app.locals.config = config

  app.get('/', HealthCheck)
  app.use('/v1', v1Routes(config))

  return app
}

export default createApp
