import createApp from '../app'
import config from '../config'

test('app', () => {
  const app = createApp(config)
  expect(app).toBeTruthy()
  expect(app.listen).toBeInstanceOf(Function)
})
