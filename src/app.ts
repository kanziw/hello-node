import Express from 'express'
import { HealthCheck, v1 } from './routes'

const app = Express()

app.get('/', HealthCheck())
app.use('/v1', v1)

export default app
