function smilePicker(compatability) {
  var smile = 10
  smile = compatability >= 0 && compatability <= 9 ? 10 : smile
  smile = compatability >= 10 && compatability <= 19 ? 20 : smile
  smile = compatability >= 20 && compatability <= 29 ? 30 : smile
  smile = compatability >= 30 && compatability <= 39 ? 40 : smile
  smile = compatability >= 40 && compatability <= 49 ? 50 : smile
  smile = compatability >= 50 && compatability <= 59 ? 60 : smile
  smile = compatability >= 60 && compatability <= 69 ? 70 : smile
  smile = compatability >= 70 && compatability <= 79 ? 80 : smile
  smile = compatability >= 80 && compatability <= 89 ? 90 : smile
  smile = compatability >= 90 && compatability <= 100 ? 100 : smile
  return smile
}

function messagePicker(compatability) {
  var message = 10
  message = compatability >= 0 && compatability <= 9 ? "Definately not meant to be." : message
  message = compatability >= 10 && compatability <= 19 ? "Maybe these two should fish in other ponds." : message
  message = compatability >= 20 && compatability <= 29 ? "It's worth a shot I guess." : message
  message = compatability >= 30 && compatability <= 39 ? "This could be an okay pairing." : message
  message = compatability >= 40 && compatability <= 49 ? "This seems like an ideal matchup." : message
  message = compatability >= 50 && compatability <= 59 ? "I ship it." : message
  message = compatability >= 60 && compatability <= 69 ? "Definately worth a shot." : message
  message = compatability >= 70 && compatability <= 79 ? "These two could be soul mates." : message
  message = compatability >= 80 && compatability <= 89 ? "They may be the one." : message
  message = compatability >= 90 && compatability <= 100 ? "It's totally meant to be." : message
  return message
}

exports.function = function (nameOne, nameTwo) {
  nameOne = nameOne.toLowerCase()
  nameTwo = nameTwo.toLowerCase()
  var compatability = 0
  var loveKey = {
    'l': 5, 'o': 4, 'v': 3, 'e': 2, 'm': 5, 'y': 5,
    'o': 4, 'u': 3, 'h': 5, 'a': 4, 'r': 3, 't': 2
  }

  for (var i = 0; i < nameOne.length; i += 1)
    compatability += loveKey[nameOne[i]] ? loveKey[nameOne[i]] : 0
  for (var i = 0; i < nameTwo.length; i += 1)
    compatability += loveKey[nameTwo[i]] ? loveKey[nameTwo[i]] : 0
  compatability = compatability * 2 < 100 ? compatability * 2 : compatability

  return {
    message: nameOne == nameTwo ? "It's almost like they're the same person" : messagePicker(compatability),
    percent: nameOne == nameTwo ? "100" : String(compatability),
    image: nameOne == nameTwo ? "100" : String(smilePicker(compatability))
  }
}