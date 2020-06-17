import { createTerminus } from '@godaddy/terminus'
import { createServer } from 'http'
import app from './app'
import { GRACEFUL_SHUTDOWN_TIMEOUT, PORT } from './config'
import { delay } from './time'

const server = createServer(app)

createTerminus(server, {
  beforeShutdown: () => delay(GRACEFUL_SHUTDOWN_TIMEOUT),
})

app.listen(PORT, () => {
  console.log(`starting hello-node server on ${PORT}`)
})
