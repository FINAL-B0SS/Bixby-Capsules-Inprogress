// AskIfDogsCanEat
// Ask If Dogs Can Eat certain foods.
var http = require('http')
var console = require('console')

// Main entry point
function askIfDogsCanEat(food) {
  if(food)
    food = food.toLowerCase();
  var response = http.getUrl('https://7zr0o7w7a8.execute-api.us-east-1.amazonaws.com/Production/getDoctorPoochAnswer', {
    format: 'json',
    query: {
      food: food,
    }
  });
  console.log(response);
  
  return {
    answer: response.answer
  }
}

// Exports
module.exports = {
  function: askIfDogsCanEat
}