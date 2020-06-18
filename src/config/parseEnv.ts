import assert from 'assert'
import { isProd } from './env'

const str = (envName: string, fallback: string): string => {
  const env = process.env[ envName ] || ''
  if (isProd) {
    assert(!!env, `Missing configuration -> ${envName}`)
  }
  return env || fallback
}

const num = (envName: string, fallback: number): number => {
  const num = parseInt(str(envName, String(fallback)), 10)
  if (isProd) {
    assert(!Number.isNaN(num), `[${envName}] is not a number`)
  }
  return Number.isNaN(num) ? fallback : num
}

export default { str, num }
export { str, num }
