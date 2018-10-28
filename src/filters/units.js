export default (value, isMetric) => {
  if (isMetric) {
    return (value - 273.15).toFixed(1)
  } else if (!isMetric) {
    return (value * 9 / 5 - 459.67).toFixed(1)
  }
}
