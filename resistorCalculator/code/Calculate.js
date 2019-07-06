/*
Takes a color and converts it to a number
*/
function colorToDigit(color) {
  var digit = 0;
  digit = color == "black" ? 0 : digit;
  digit = color == "brown" ? 1 : digit;
  digit = color == "red" ? 2 : digit;
  digit = color == "orange" ? 3 : digit;
  digit = color == "yellow" ? 4 : digit;
  digit = color == "green" ? 5 : digit;
  digit = color == "blue" ? 6 : digit;
  digit = color == "violet" ? 7 : digit;
  digit = color == "grey" || color == "gray" ? 8 : digit;
  digit = color == "white" ? 9 : digit;
  digit = color == "gold" ? 10 : digit;
  digit = color == "silver" ? 10 : digit;
  return digit;
}

/*
 Takes a color and figures out what the number generated
 from the first three bands will be mulitplied by
*/
function colorToMultiplier(color) {
  var multiplier = 0;
  multiplier = color == "black" ? 1 : multiplier;
  multiplier = color == "brown" ? 10 : multiplier;
  multiplier = color == "red" ? 100 : multiplier;
  multiplier = color == "orange" ? 1000 : multiplier;
  multiplier = color == "yellow" ? 10000 : multiplier;
  multiplier = color == "green" ? 100000 : multiplier;
  multiplier = color == "blue" ? 1000000 : multiplier;
  multiplier = color == "violet" ? 10000000 : multiplier;
  multiplier = color == "grey" || color == "gray" ? 100000000 : multiplier;
  multiplier = color == "white" ? 1000000000 : multiplier;
  multiplier = color == "gold" ? 0.1 : multiplier;
  multiplier = color == "silver" ? 0.01 : multiplier;
  return multiplier;
}

/*
 Takes a color and figures out what the tolerance percent is
*/
function colorToTolerance(color) {
  var tolerance = 0;
  tolerance = color == "brown" ? 1 : tolerance;
  tolerance = color == "red" ? 2 : tolerance;
  tolerance = color == "green" ? 0.5 : tolerance;
  tolerance = color == "blue" ? 0.25 : tolerance;
  tolerance = color == "violet" ? 0.10 : tolerance;
  tolerance = color == "grey" || color == "gray" ? 0.05 : tolerance;
  tolerance = color == "gold" ? 5 : tolerance;
  tolerance = color == "silver" ? 10 : tolerance;
  return tolerance;
}

/*
  If the resistor has 6 bands this function is called and will
  figure out the temperture coefficient based on the last color
*/
function colorToTempco(color) {
  var tempco = 0;
  tempco = color == "black" ? 0 : tempco;
  tempco = color == "brown" ? 100 : tempco;
  tempco = color == "red" ? 50 : tempco;
  tempco = color == "orange" ? 15 : tempco;
  tempco = color == "yellow" ? 25 : tempco;
  tempco = color == "green" ? 0 : tempco;
  tempco = color == "blue" ? 10 : tempco;
  tempco = color == "violet" ? 5 : tempco;
  tempco = color == "grey" || color == "gray" ? 8 : tempco;
  tempco = color == "white" ? 0 : tempco;
  tempco = color == "gold" ? 0 : tempco;
  tempco = color == "silver" ? 0 : tempco;
  return tempco;
}

/*
  Takes a plane text array, converts it to lowercase,
  split the string by spaces, then parses for colors in the
  the string and stores those colors in a new array
*/
function textToColors(text) {
  var colors = [];
  
  text = text.toLowerCase();
  text = text.split(" ");

  for (var i = 0; i < text.length; i++) {
    text[i] == "black" ? colors.push(text[i]) : 0;
    text[i] == "brown" ? colors.push(text[i]) : 0;
    text[i] == "red" ? colors.push(text[i]) : 0;
    text[i] == "orange" ? colors.push(text[i]) : 0;
    text[i] == "yellow" ? colors.push(text[i]) : 0;
    text[i] == "green" ? colors.push(text[i]) : 0;
    text[i] == "blue" ? colors.push(text[i]) : 0;
    text[i] == "violet" ? colors.push(text[i]) : 0;
    text[i] == "grey" || text[i] == "gray" ? colors.push(text[i]) : 0;
    text[i] == "white" ? colors.push(text[i]) : 0;
    text[i] == "gold" ? colors.push(text[i]) : 0;
    text[i] == "silver" ? colors.push(text[i]) : 0;
  }
  return colors;
}

exports.function = function (text) {
  var colors = textToColors(text)
  var tolerance = 0
  var number = 0;
  var digit = 0;
  var tempco = 0;

  if (colors.length < 3) {
    return {
      text: "I need more bands too work with",
      image: {
        url: "images/resistor.png"
      }
    }
  }
  if (colors.length > 6) {
    var error = "";
    for (var i = 0; i < colors.length - 1; i++)
      error += colors[i] + ", ";
    error += "and " + colors[colors.length - 1] + " is not a valid band combination";
    return {
      text: error,
      image: {
        url: "images/resistor.png"
      }
    }
  }
  if (colors.length <= 5)
      tolerance = colorToTolerance(colors[colors.length - 1]);
  else if (colors.length == 6)
      tolerance = colorToTolerance(colors[colors.length - 2]);
  if (tolerance == 0)
    return {
      text: "Black, orange, yellow, and white can not be used as the tolerance band",
      image: {
        url: "images/resistor.png"
      }
    }
  for (var i = 0; i < colors.length - 2; i++) {
    number *= 10;
    digit = colorToDigit(colors[i]);
    if (digit == 10)
      return {
        text: "Gold and silver can not be used for the 1st, 2nd, or 3rd band",
        image: {
          url: "images/resistor.png"
        }
      }
    number += digit
  }
  number *= colorToMultiplier(colors[colors.length - 2]);
  number = Math.round(10*number)/10
  if (colors.length == 6)
    text = number + " " + "Ohms" + " a " + tolerance + "% tolerance" + " and a temperature Coefficient of " + colorToTempco(colors[colors.length - 1]) + " degrees celsius"
  else
    text = number + " " + "Ohms" + " and  " + tolerance + "% tolerance"
  return {
    text: text,
    image: {
      url: "images/resistor.png"
    }
  }
}