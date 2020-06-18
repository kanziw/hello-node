import axios from 'axios'
import { Request, RequestHandler, Response } from 'express'
import { Config } from '../../config'
import { delay } from '../../time'

type Headers = {
  [ key: string ]: string
}

type MSAResponse = {
  name: string,
  headers: Headers
  history?: MSAResponse[]
}

const MSA = (config: Config): RequestHandler => {
  const {
    SERVICE_NAME,
    TARGET_HOST,
    HEADER_PREFIXES_FOR_PROPAGATION,
    DELAY_MS_BETWEEN_REQUEST_TO_TARGET,
  } = config

  // 다른 MicroService 에 요청을 넘길 때 전파할 Header Prefix 배열 (소문자)
  const propagatableHeaderPrefixes: string[] = HEADER_PREFIXES_FOR_PROPAGATION
    .map(s => s.toLowerCase())

  const requestToTarget = async (beforeHeaders: Headers) => {
    if (!TARGET_HOST) return {}
    const headers: Headers = {}
    if (propagatableHeaderPrefixes.length) {
      Object.entries(beforeHeaders).forEach(([ key, value ]) => {
        if (propagatableHeaderPrefixes.some(prefix => key.toLowerCase().startsWith(prefix))) {
          headers[ key ] = value
        }
      })
    }
    const { data } = await axios.get(`http://${TARGET_HOST}/v1/msa`, { headers })
    return data
  }

  return async (req: Request, res: Response) => {
    const headers = req.headers as Headers

    await delay(DELAY_MS_BETWEEN_REQUEST_TO_TARGET)
    const { history = [] } = await requestToTarget(headers)
    await delay(DELAY_MS_BETWEEN_REQUEST_TO_TARGET)

    const response: MSAResponse = { name: SERVICE_NAME, headers }
    res.json({ ...response, history: [ response, ...history ] })
  }
}

export { MSAResponse, MSA }
