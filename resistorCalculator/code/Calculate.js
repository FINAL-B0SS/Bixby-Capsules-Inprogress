function errorCheck(colors, tolerance, tempco) {
  if (colors.length < 3)
    return 'I need more bands to work with'
  if (!tolerance && colors.length != 3)
    return 'Black, orange, yellow, and white can not be used as the tolerance band'
  if (colors.length > 6) {
    var error = colors.slice(0, -1).map((color) => {
      return color + ', '
    })
    error.push('and ' + colors[colors.length - 1] + ' is not a valid band combination')
    return error.join(' ')
  }
  if (!tempco && colors.length == 6)
    return ('Black, green, white, gold, and silver can not be used as the temperature coefficient band')
}

function messageBuilder(colors, tolerance, number, tempco) {
  const multiplierKey = {
    'black': 1, 'brown': 10, 'red': 100, 'orange': 1000, 'yellow': 10000, 'green': 100000, 'blue': 1000000,
    'violet': 10000000, 'grey': 100000000, 'gray': 100000000, 'white': 1000000000, 'gold': 0.1, 'silver': 0.01
  }
  number = Math.round(10 * (number * multiplierKey[colors[colors.length < 5 ? 2 : 3]]) / 10).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  var message = [number + ' Ohms']

  tolerance ? message.push(tolerance + '% tolerance') : 0
  tempco ? message.push('and a temperature coefficient of ' + tempco + ' degrees celsius') : 0
  return message.join(' ')
}

exports.function = function (text) {
  const tempcoKey = {
    'black': 0, 'brown': 100, 'red': 50, 'orange': 15, 'yellow': 25, 'green': 0, 'blue': 10,
    'violet': 5, 'grey': 8, 'gray': 8, 'white': 0, 'gold': 0, 'silver': 0
  }
  const digitKey = {
    'black': 0, 'brown': 1, 'red': 2, 'orange': 3, 'yellow': 4, 'green': 5, 'blue': 6,
    'violet': 7, 'grey': 8, 'gray': 8, 'white': 9, 'gold': 10, 'silver': 10,
  }
  const toleranceKey = {
    'brown': 1, 'red': 2, 'green': 0.5, 'blue': 0.25, 'violet': 0.10, 'grey': 0.05,
    'gray': 0.05, 'gold': 5, 'silver': 10,
  }
  var colors = text.toLowerCase().split('-').join(' ').split(' ').filter((color) => {
    return ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'gray', 'white', 'gold', 'silver'].indexOf(color) > -1
  })
  var tempco = colors.length == 6 ? tempcoKey[colors[colors.length - 1]] : null
  var tolerance = colors ? toleranceKey[colors[colors.length < 5 ? 3 : 4]] : null
  var number = 0;

  if (errorCheck(colors, tolerance, tempco)) {
    return {
      text: errorCheck(colors, tolerance),
      image: { url: 'icon.png' }
    }
  }
  for (var i = 0; i < (colors.length < 5 ? 2 : 3); i++) {
    var digit = digitKey[colors[i]]
    number = (number * 10) + digit
    if (digit == 10)
      return {
        text: 'Gold and silver can not be used for the 1st, 2nd, or 3rd band',
        image: { url: 'icon.png' }
      }
  }
  return {
    text: messageBuilder(colors, tolerance, number, tempco),
    image: { url: 'icon.png' }
  }
}