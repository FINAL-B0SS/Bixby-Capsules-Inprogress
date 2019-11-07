module.exports.function = function fetchGame() {
  var game = require('./Games')[0]
  game.incorrectGuesses = 0
  game.correctGuesses = 0
  game.guesses = " "
  game.image = 'images/hangman0.png'
  game.message = "Say a letter"
  game.startFlag = 0
  game.template = game.answer.replace(/[a-zA-Z]/g, '_ ')
  return game
}