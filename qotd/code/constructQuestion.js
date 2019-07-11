module.exports.function = function constructQuestion (gameState) {
  return {
    gameState: gameState,
    constructedOption: [
      {
        option: gameState.optionA,
        alias: "A"
      },
      {
        option: gameState.optionB,
        alias: "B"
      },
      {
        option: gameState.optionC,
        alias: "C"
      },
      {
        option: gameState.optionD,
        alias: "D"
      },
    ]
  }
}
