function getNumber(ticket) {
  var number = 0
  number = ticket == "powerball" ? 5 : number;
  number = ticket == "megamillions" ? 5 : number;
  number = ticket == "superlottoplus" ? 5 : number;
  number = ticket == "fantasyfive" || ticket == "fantasy5" ? 5 : number;
  number = ticket == "dailyfour" || ticket == "daily4" ? 4 : number;
  number = ticket == "dailythree" || ticket == "daily3" ? 3 : number;
  return number;
}

function getRange(ticket) {
    var number = 0
  number = ticket == "powerball" ? 69 : number;
  number = ticket == "megamillions" ? 70 : number;
  number = ticket == "superlottoplus" ? 47 : number;
  number = ticket == "fantasyfive" || ticket == "fantasy5" ? 39 : number;
  number = ticket == "dailyfour" || ticket == "daily4" ? 9 : number;
  number = ticket == "dailythree" || ticket == "daily3" ? 9 : number;
  return number;
}

function getSpecial(ticket) {
  var number = 0
  number = ticket == "powerball" ? 26 : number;
  number = ticket == "megamillions" ? 25 : number;
  number = ticket == "superlottoplus" ? 27 : number;
  return number;
}

function isValid(ticket) {
  var number = 0
  number = ticket == "powerball" ? 1 : number;
  number = ticket == "megamillions" ? 1 : number;
  number = ticket == "superlottoplus" ? 1 : number;
  number = ticket == "fantasyfive" || ticket == "fantasy5" ? 1 : number;
  number = ticket == "dailyfour" || ticket == "daily4" ? 1 : number;
  number = ticket == "dailythree" || ticket == "daily3" ? 1 : number;
  return number;
}

exports.function = function (text) {
  if (!text)
    return {
      text: "I don't know that ticket",
      image: {
        url: ""
      }
    }
  text = text.replace(/\s+/g, '');
  text = text.toLowerCase();
  if (!isValid(text))
    return {
      text: "I don't know that ticket",
      image: {
        url: ""
      }
    }
  var ticket = {}
  ticket.numbers = getNumber(text);
  ticket.range = getRange(text);
  ticket.special = getSpecial(text);
  var luckyNumbers = []
  var ret = "";
  for (var i = 0; i < ticket.numbers; i++)
    luckyNumbers.push(Math.floor(Math.random() * ticket.range));
  if (ticket.special)
    luckyNumbers.push(Math.floor(Math.random() * ticket.special))
  for (var i = 0; i < luckyNumbers.length; i++)
    ret += luckyNumbers[i] + " "
  return {
    text: "Try playing " + ret,
    image: {
      url: "images/lottery.png"
    }
  }
}