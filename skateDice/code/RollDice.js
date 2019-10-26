var console = require('console')

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

function countInArray(array, key) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === key) {
      count++;
    }
  }
  return count;
}

function buildTrick(rawTrick) {
  var trick = []
  for (var i = 0; i < rawTrick.length; i++)
    if (rawTrick[i] != 'x' && rawTrick[i] != 'sk8dice')
      trick.push(rawTrick[i])
  if (countInArray(rawTrick, 'sk8dice') == 4)
    trick = ['Take or Give a Letter']
  if (countInArray(rawTrick, 'x') == 4)
    trick = ['Choose a Trick']
  if (countInArray(rawTrick, 'x') == 3)
    trick.push('With a Variation')
  return trick.join(' ') ? trick.join(' ') : trick[0]
}

module.exports.function = function roleDice() {
  var flips = ['Kickflip', 'Heelflip', 'Shuvit']
  var rotations = ['180', '360', 'x', 'sk8dice']
  var stances = ['Regular', 'Switch', 'Fakie', 'Nollie']
  var direction = ['Frontside', 'Backside', 'x', 'sk8dice']
  var rawTrick = [stances[Math.floor(Math.random() * 4)], direction[Math.floor(Math.random() * 4)], rotations[Math.floor(Math.random() * 4)], flips[Math.floor(Math.random() * 3)]]
  var calculatedTrick = buildTrick(rawTrick)

  return {
    trick: calculatedTrick.replace('Shuvit', 'Pop Shove It'),
    spokenTrick: calculatedTrick.replace('180', 'one eighty').replace('360', 'three sixty').replace('Shuvit', 'Pop Shove It'),
    dice: shuffle(rawTrick.map(image => {
      return ({ url: 'images/' + image.toLowerCase() + '.png' })
    }))
  }
}