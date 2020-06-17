import assert from 'assert'

const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = NODE_ENV === 'production'

function s(envName: string, fallback: string = ''): string {
  const env = process.env[ envName ] || ''
  if (isProd) {
    assert(!!env, `Missing configuration -> ${envName}`)
  }
  return env || fallback
}

function n(envName: string, fallback: number): number {
  const num = parseInt(s(envName, String(fallback)), 10)
  if (isProd) {
    assert(!Number.isNaN(num), `[${envName}] is not a number`)
  }
  return Number.isNaN(num) ? fallback : num
}

const PORT = n('PORT', 8080)
const GRACEFUL_SHUTDOWN_TIMEOUT = n('GRACEFUL_SHUTDOWN_TIMEOUT', 10) * 1000
const SERVICE_NAME = s('SERVICE_NAME', 'hello-node')

export {
  isProd,
  PORT,
  GRACEFUL_SHUTDOWN_TIMEOUT,
  SERVICE_NAME,
}
