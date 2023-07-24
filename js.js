
// function to inject html snipets on main page - as provided in w3schools
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

// FUNCTIONS FOR WORDLE GAME

// function to iniciate the game: chooses a word from the words available and returns it to the game
function wordleInitiate() {

  const words = ["DREAM", "QUICK", "ABOUT", "ABOVE", "ADORE", "AGILE", "ALIVE",
  "BINGO", "BLING", "BLUSH", "CHARM", "CLEAN", "ENJOY", "FAITH", "FOCUS", "GLORY", "GOALS", "GRACE", "GREAT",
  "HEART", "HUMAN", "HUMOR", "LAUGH", "LEARN", "LIGHT", "LOGIC", "LUCKY", "MAGIC", "MERIT", "MOVED", "NIGHT", "NOBLE",
  "POWER", "PRIDE", "PROUD", "READY", "RELAX", "SHINE", "ROYAL", "SMART", "SMILE", "SOLID", "SPACE", "SPARK", "STUDY",
  "STYLE", "THANK", "TOUCH", "UNITY", "VALID", "VALUE", "VIGOR", "WATER", "WHOLE", "WORTH", "WRITE", "YOUNG"];

  let wSelected = words[Math.floor(Math.random() * words.length) - 1];

  return wSelected;

}

function wordlePlay (input, wSelected, attempts) {

  // activate the attempt'th row in the css
  document.querySelector('#line' + attempts).style.display = "table-row";

  // if word matches
  if (input == wSelected)
  {

    // function to populate the row with word of player and return true for victory
    for (let i = 0; i < 5 ; i++)
    {
      document.querySelector('#cell'+attempts+(i+1)).innerHTML = input[i];
      document.querySelector('#cell'+attempts+(i+1)).style.backgroundColor = "#224f22";
      document.querySelector('#cell'+attempts+(i+1)).style.boxShadow = "0px 7px 7px -2px #214621";
     }

    return true;

  }

  // if word does not match check each char and set box as letter correct, present or wrong
  for (let i = 0 ; i < 5 ; i++)
  {
    for (let j = 0 ; j < 5 ; j++)
    {
      if (input[i] == wSelected[j])
      {
        if (i == j)
        {
          // fill with data to populate the i'th cell of the attempt'th row with the letter as correct
          document.querySelector('#cell'+attempts+(i+1)).innerHTML = input[i];
          document.querySelector('#cell'+attempts+(i+1)).style.backgroundColor = "#224f22";
          document.querySelector('#cell'+attempts+(i+1)).style.boxShadow = "0px 7px 7px -2px #214621";
        }
        else
        {
          // fill with data to populate the i'th cell of the attempt'th row with the letter as present but not in the correct position
          document.querySelector('#cell'+attempts+(i+1)).innerHTML = input[i];
          document.querySelector('#cell'+attempts+(i+1)).style.backgroundColor = "#EAB05E";
          document.querySelector('#cell'+attempts+(i+1)).style.boxShadow = "0px 7px 7px -2px #a97935";
        }
      }
      else
      {
        // fill with data to populate the i'th cell of the attempt'th row with the letter as not present in the word
        document.querySelector('#cell'+attempts+(i+1)).innerHTML = input[i];
      }
    }
  }

  // return as word not found
  return false;
}


// Receive and process input word
document.querySelector('form'),addEventListener('submit', function(event) {

  let input = document.querySelector('#input').value;

  // Cancel process if there was no input
  if (input.length == 0)
  {
    event.preventDefault();
    return 1;
  }

  // Input validation - alphabet character limiter based on stack overflow search
  if (input.length != 5 || !/^[a-z]+$/i.test(input))
  {
      // reject non 5 letter words
      document.querySelector('#validation').innerHTML = 'Not a 5 letter word';
      setTimeout(function(){
      document.querySelector('#validation').innerHTML = '&nbsp';
      }, 3000);

      event.preventDefault();
      return 1;
  }
  else
  {
    // Set input to uppercase
    input = input.toUpperCase();


    // If game is being lauched for the first time or restarts  select word to guess
    if (attempts == 0)
    {
      wSelected = wordleInitiate();
      let won = false;
    }

    attempts++;
    won = wordlePlay (input, wSelected, attempts);
  }

  document.getElementById("input").value = "";

  if (attempts == 6 && won == false)
  {
    // end the game because all attempts were used
    document.querySelector('#launch').disabled = true;
    document.querySelector('#box').style.display = 'block';
    document.querySelector('#box').style.backgroundColor = '#e06666';
    document.querySelector('#box').style.boxShadow =  '0px 7px 7px -2px #990000';
    document.querySelector('#box').innerHTML = "<p>Sorry... Out of tries. The word was "+wSelected+". Better luck next time.</p>";
    event.preventDefault();
    return 0;
  }

  if (won == true)
  {
    // end the game with victory
    document.querySelector('#launch').disabled = true;
    document.querySelector('#box').style.display = 'block';
    document.querySelector('#box').style.backgroundColor = '#224f22';
    document.querySelector('#box').style.boxShadow =  '0px 7px 7px -2px #214621';
    document.querySelector('#box').innerHTML = "<p>You have got it in "+attempts+" attempts! Congratulations!</p>";

    event.preventDefault();
    return 0;
  }

  event.preventDefault();
  return 0;
});
