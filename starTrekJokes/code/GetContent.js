const UTIL = require("./lib/util");
const CONTENT = require("./content");
const GET_REMOTE = require('./lib/getRemoteContent.js')
// GetContent
exports.function = function (searchTerm) {
  //You can replace with a call to a web api - make sure you map api response to content model
  var content = CONTENT
  var chosenContent

    // Get content from local content.js file 
    // filter based on searchTerm (note that if you use a web API, then filtering can be done in the web API itself)
    if (searchTerm) {
      content = UTIL.findContent(content, searchTerm)
    }

    //pick a random content
    if (content.length) {
      var index = Math.floor(content.length * Math.random())
      chosenContent = content[index]
    }
  
  // return content if exists, else null (No Result)
  if (chosenContent) {
    return {
      question: chosenContent.question,
      answer: chosenContent.answer,
      image: {
        url: "images/laugh/laugh" + Math.floor(Math.random() * 13) + ".jpg"
      },
    }
  } else {
    return {
      question: "Hmmm I don't know any " + searchTerm + " jokes ",
      image: {
        url: "images/idk/idk" + Math.floor(Math.random() * 4) + ".jpg"
      },
      answer: " ",
    }
  }
}
