import { formatToRFC3339Nano } from '../time'

test('formatToRFC3339Nano', () => {
  const date = new Date(1592409044825)
  expect(formatToRFC3339Nano(date)).toBe('2020-06-17T15:50:44.825000000Z00:00')
})
