export default {
  randomId () {
    const chars = 'abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let id = ''
    for (let i = 0; i < 10; i++) {
      id += chars[Math.floor(Math.random() * chars.length)]
    }
    return id
  },
  iconId (iconIdToChange) {
    const id = iconIdToChange.substring(0, 2)
    let iconId
    switch (id) {
      case '03':
        iconId = '03'
        break
      case '04':
        iconId = '04'
        break
      case '09':
        iconId = '09'
        break
      case '11':
        iconId = '11'
        break
      case '13':
        iconId = '13'
        break
      case '50':
        iconId = '50'
        break
      default: iconId = iconIdToChange
        break
    }
    return iconId
  }
}
