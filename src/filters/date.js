export default (value, format) => {
  let date = new Date(value * 1000)
  if (format === 'weekday') {
    date = date.toLocaleString(['en-GB'], { weekday: 'short' })
  }
  if (format === 'short') {
    date = date.toLocaleString(['en-GB'], { hour12: false, hour: '2-digit', minute: '2-digit' })
  }
  if (format === 'long') {
    date = date.toLocaleString(['en-GB'], { year: 'numeric', month: 'short', day: '2-digit', weekday: 'short', hour12: false, hour: '2-digit', minute: '2-digit' }).replace(/,/g, '')
  }
  return date
}
