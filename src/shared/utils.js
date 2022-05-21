export const DAYS_OF_WEEK = 7
export const A_DAY = 24 * 60 * 60 * 1000

export const readableDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)

export const getDays = (date) => {
  if (date instanceof Date) {
    // console.log(readableDate(date))
    // console.log(date.getFullYear(), date.getMonth())
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
}
