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
  
  // Hit the dog ceo api for a random dog image
  var dogImage = http.getUrl('https://dog.ceo/api/breeds/image/random', {
    format: 'json',
  });  
  // Store the first 100 characters of the pulled answer
  if (response.answer.length > 99) {
    var answer = response.answer.slice(0, 99);
    var i = 99;
    while (i != 0 && answer[i] != '.')
      i -= 1;
    answer = answer.slice(0, i)
  }
  // If the whole string got deleted because there was no prior period.
  // Copy the entire original answers
  if (!answer)
    answer = response.answer;
  
  return {
    answer: response.answer,
    // Speech is for the dialogue audio
    speech: answer,
    food: food,
    // dogImage is pulled from the dog ceo api.
    image: {
      url: dogImage.message
    }
  }
}

// Exports
module.exports = {
  function: askIfDogsCanEat
}