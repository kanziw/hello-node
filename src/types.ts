import { Express } from 'express'
import { Config } from './config'

interface Application extends Express {
  locals: {
    config: Config
  }
}

export { Application }
