module.exports.function = function getQuestion (gameState, $vivContext) {
  var http = require('http')
  var config = require('config')
  var console = require('console') 
  var sessionAttributes = {}
  var newSession = false
  var requestType = "IntentRequest"
  
  if(typeof gameState == 'undefined'){
    gameState = {}
    newSession = true
    requestType = "LaunchRequest"
  } else {
    sessionAttributes = JSON.parse(gameState.sessionAttributes)
  }
  
  var request = {
      "version": "1.0",
      "platform": "Bixby",
      "session": {
        "attributes": sessionAttributes,
        "new": newSession,
        "sessionId": $vivContext.sessionId,
        "application": {
          "applicationId": "amzn1.ask.skill.0f26244c-7411-4c2c-8401-d808c57eedef"
        },
        "user": {
          "userId": $vivContext.userId,
          "accessToken":$vivContext.accessToken,
        }
      },
      "context": {
        "Display": {},
        "System": {
          "application": {
            "applicationId": "amzn1.ask.skill.0f26244c-7411-4c2c-8401-d808c57eedef"
          },
          "user": {
            "userId": $vivContext.userId,
            "accessToken":$vivContext.accessToken,
          },
          "device": {
            "deviceId": "ABC123",
            "device": $vivContext.device,
            "deviceModel": $vivContext.deviceModel,
            "supportedInterfaces": {
              "Display": {
                "templateVersion": "1.0",
                "markupVersion": "1.0"
              }
            }
          },
          "apiEndpoint": "https://api.amazonalexa.com",
          "apiAccessToken": null
        },
        "Viewport": {
        }
      },
      "request": {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.fe415098-28c1-4b39-a1cf-2f11186a19ea",
        "timestamp": "2019-06-05T19:56:45Z",
        "locale": "en-US",
        "intent": {
          "name": "AMAZON.RepeatIntent",
          "confirmationStatus": "NONE"
        }
      },
      "vivContext": $vivContext
    }
  
   var options = { 
    format: 'json',
     passAsJson: true
  };
  
  var response = http.postUrl(config.get('remote.url'), request, options);
  
  
  var output = removeTags(response.response.outputSpeech.ssml)
  
  var gameState = {}
  gameState.sessionAttributes = JSON.stringify(response.sessionAttributes)
  gameState.speech = removeTags(response.response.outputSpeech.ssml)
  
  gameState.question = null
  
  gameState.optionA = null
  gameState.optionB = null
  gameState.optionC = null
  gameState.optionD = null

  if(typeof response.sessionAttributes.currentQuestion != 'undefined'){
    if(typeof response.sessionAttributes.currentQuestion.question != 'undefined'){
      gameState.question = removeCommas(removeTags(response.sessionAttributes.currentQuestion.question))
    }
    if(typeof response.sessionAttributes.currentQuestion.answers[0] != 'undefined'){
      gameState.optionA = removeCommas(removeTags(response.sessionAttributes.currentQuestion.answers[0].answer_speak))
    }
    if(typeof response.sessionAttributes.currentQuestion.answers[1] != 'undefined'){
      gameState.optionB = removeCommas(removeTags(response.sessionAttributes.currentQuestion.answers[1].answer_speak))
    }
    if(typeof response.sessionAttributes.currentQuestion.answers[2] != 'undefined'){
      gameState.optionC = removeCommas(removeTags(response.sessionAttributes.currentQuestion.answers[2].answer_speak))
    }
    if(typeof response.sessionAttributes.currentQuestion.answers[3] != 'undefined'){
      gameState.optionD = removeCommas(removeTags(response.sessionAttributes.currentQuestion.answers[3].answer_speak))
    }
  }
  
  console.log(gameState.sessionAttributes)
  console.log(gameState.speech)
  console.log($vivContext)
  
  
  return gameState 
  
  function removeTags(txt) {
    var rex = /(<([^>]+)>)/ig;
    return txt.replace(rex, "").trim()
  }
  
  
  function removeCommas(txt){
    return txt.replace(',', '')
  }
}
