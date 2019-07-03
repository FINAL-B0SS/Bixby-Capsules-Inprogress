const UTIL = require("./lib/util");
const CONTENT = require("./content");

// GetContent
exports.function = function (searchTerm) {
  //You can replace with a call to a web api - make sure you map api response to content model
  var content = CONTENT
  var chosenContent

    // Get content from local content.js file 
    // filter based on searchTerm
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
      text: chosenContent.text,
      image: {
        url: "images/burger.png"
      }
    }
  } else {
    return null;
  }
}
