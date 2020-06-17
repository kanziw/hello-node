import app from '../app'

test('app', () => {
  expect(app).toBeTruthy()
  expect(app.listen).toBeInstanceOf(Function)
})
