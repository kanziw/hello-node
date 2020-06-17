type nowResult = {
  milli: number
  micro: number
  nano: number
  formatRFC3339Nano: string
}

const now = (): nowResult => {
  const date = new Date()
  const milli = date.getTime()
  return {
    milli,
    micro: milli * 1000,
    nano: milli * 1000000,
    formatRFC3339Nano: formatToRFC3339Nano(date),
  }
}

const formatToRFC3339Nano = (date: Date): string => {
  const [ datetime ] = date.toISOString().split('.')
  return `${datetime}.${date.getUTCMilliseconds()}000000Z00:00`
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default { now }
export { now, formatToRFC3339Nano, delay }
