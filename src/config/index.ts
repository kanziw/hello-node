import { isProd } from './env'
import parseEnv from './parseEnv'

type Config = {
  isProd: boolean

  SERVICE_NAME: string
  SERVICE_PORT: number
  GRACEFUL_SHUTDOWN_TIMEOUT: number

  TARGET_HOST: string
  HEADER_PREFIXES_FOR_PROPAGATION: string[]
  DELAY_MS_BETWEEN_REQUEST_TO_TARGET: number
}

const SERVICE_NAME = parseEnv.str('SERVICE_NAME', 'hello-node')
const SERVICE_PORT = parseEnv.num('SERVICE_PORT', 8080)
const GRACEFUL_SHUTDOWN_TIMEOUT = parseEnv.num('GRACEFUL_SHUTDOWN_TIMEOUT', 10) * 1000

const TARGET_HOST = parseEnv.str('TARGET_HOST', '')
const HEADER_PREFIXES_FOR_PROPAGATION = parseEnv.str('HEADER_PREFIXES_FOR_PROPAGATION', '')
  .split(',')
  .map(str => str.trim())
  .filter(Boolean)
const DELAY_MS_BETWEEN_REQUEST_TO_TARGET = parseEnv.num('DELAY_MS_BETWEEN_REQUEST_TO_TARGET', 0)

const config: Config = {
  isProd,

  SERVICE_NAME,
  SERVICE_PORT,
  GRACEFUL_SHUTDOWN_TIMEOUT,

  TARGET_HOST,
  HEADER_PREFIXES_FOR_PROPAGATION,
  DELAY_MS_BETWEEN_REQUEST_TO_TARGET,
}

export default config
export { Config }
