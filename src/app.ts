import Express from 'express'
import { HealthCheck, Time } from './routes'

const app = Express()

app.get('/', HealthCheck())
app.get('/time', Time())

export default app
