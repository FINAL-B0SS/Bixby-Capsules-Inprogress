var console = require('console')

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function incrementScores(game, correct, guess) {
  if (correct) {
    game.correctGuesses++
    game.message = "Nice guess!"
  } else {
    game.incorrectGuesses++
    if (game.incorrectGuesses != 6) {
      game.message = 'Sorry there\'s no ' + guess
    } else {
      game.message = 'Yikes better luck next time'
      game.startFlag = 5
    }
  }
  return game
}

function checkGuess(game, correct, guess) {
  var tmp = ""
  
  game.guesses += guess + ' '
  game.template = replaceAll(game.template, '_ ', '_')
  for (var i = 0; i < game.answer.length; i++) {
    if (game.answer[i].toLowerCase() == guess.toLowerCase()) {
      tmp += game.answer[i]
      correct = 1
    } else
      tmp += game.template[i]
  }
  game.template = replaceAll(tmp, '_', '_ ')
  game = incrementScores(game, correct, guess)
  return game
}

module.exports.function = function updateGame(game, guess) {
  var correct = 0

  if (game.startFlag) {
    if (game.message != 'Congratulations, You win!' && game.message != 'Yikes better luck next time') {
      if (typeof game.guesses == 'object')
        game.guesses = game.guesses[0]
      if (typeof game.template == 'object')
        game.template = game.template[0]
      if (guess && game.guesses.includes(guess))
        game.message = 'You already tried ' + guess[0] + ' 😑'
      else if (guess && game.incorrectGuesses != 6) {
        game = checkGuess(game, correct, guess[0])
      }
      if (!game.template.includes('_')) {
        game.message = 'Congratulations, You win!'
        game.startFlag = 5
      }
    }
  }
  if (game.message == 'Congratulations, You win!')
    game.startFlag--
  !game.startFlag ? game.startFlag = 1 : 0
  game.image = 'images/hangman' + game.incorrectGuesses + '.png'
  return game
}