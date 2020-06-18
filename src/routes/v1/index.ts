import Express from 'express'
import { Config } from '../../config'
import { MSA } from './msa'
import { Time } from './time'

const v1Routes = (config: Config) => {
  const router = Express.Router()

  router.get('/time', Time)
  router.get('/msa', MSA(config))

  return router
}
export default v1Routes
