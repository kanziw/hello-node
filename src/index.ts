import { createTerminus } from '@godaddy/terminus'
import { createServer } from 'http'
import createApp from './app'
import config from './config'
import { delay } from './time'

const server = createServer(createApp(config))

const { GRACEFUL_SHUTDOWN_TIMEOUT, SERVICE_PORT: PORT } = config

createTerminus(server, {
  beforeShutdown: () => delay(GRACEFUL_SHUTDOWN_TIMEOUT),
})

server.listen(PORT, () => {
  console.log(`starting hello-node server on ${PORT}`)
})
