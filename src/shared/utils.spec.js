import { getDays } from './utils'

test('getDays(date), get days of month from date object', () => {
  // 2022.2.1
  expect(getDays(new Date(2022, 1, 1))).toBe(28)
  // 2020.2.1
  expect(getDays(new Date(2020, 1, 1))).toBe(29)
})
