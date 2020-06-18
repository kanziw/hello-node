import Express from 'express'
import { Time } from './time'

const router = Express.Router()
router.get('/time', Time())

export default router
