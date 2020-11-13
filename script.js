
// Create app namespace to hold all methods
const guessApp = {};

// Create an object (with arrays inside) which consists of the correct answer words that the user has to guess!
guessApp.answers = {
  word: ["kite", "coding", "basketball", "tide", "heat", "wheat", "darkness", "olympics", "snowflakes", "fireworks"]
}

// Randomly return the array index number to re-use later 
const randomizer = function (array) {
  return Math.floor(Math.random() * array.length);
}

// Randomly select a word that the user has to guess and save it to a variable
let answerArray = guessApp.answers.word;
let randomAnswerIndex = randomizer(answerArray);
let myAnswer = answerArray[randomAnswerIndex];

// Global variables, the timerID and the number of seconds the user has to successfully guess the word!
let timerVar;
let seconds = 10;

//Start GuessApp
guessApp.init = function () {
  $winningPage = $(".winner");
  $playPage = $(".play");
  $gameOverPage = $(".game-over");
  $instructionsPage = $("header");

  $timer = $("#timer");
  $spaces = $("#spaces");

  $image = $("#image");

  $winningPage.hide();
  $playPage.hide();
  $gameOverPage.hide();

  guessApp.displayInfo(randomAnswerIndex, myAnswer);
  guessApp.findMatch();
  guessApp.buttonEventListeners();
}

// Display the randomly selected image usind the index number and "_" onto the screen
guessApp.displayInfo = function (randomAnswerIndex, myAnswer) {
  let underScores = "";

  $image.attr("src", `./assets/image${randomAnswerIndex}.jpg`);

  for (let i = 0; i < myAnswer.length; i++) {
    underScores = underScores + "_" + " ";
    $spaces.text(`${underScores}`);
  }

}

// Start the time interval and go down by 1 per second!
guessApp.countTimer = function () {
  seconds--;
  $('.game-over-icons').empty();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (seconds <= 0) {
    clearInterval(timerVar);
    guessApp.displayLosingIcons();
    seconds = 10;
    $timer.html("00");
    $playPage.hide();
    $gameOverPage.show();
  }
  $timer.html(`${seconds} Sec...`);

}

// Create winning icons animating on the screen when user wins the game!
guessApp.displayWinningIcons = function () {
  // Display the '22' happy icons animating on the screen when user wins the game :)
  for (i = 1; i <= 22; i++) {

    if (i>=1 && i<=11) {
      if (i == 4 || i == 8) {
        $(".winning-icons").append(`<li><i class="far fa-smile-beam animate__animated animate__backOutUp animate__infinite"></i></li>`);
      }
      else
        $(".winning-icons").append(`<li><i class="far fa-smile animate__animated animate__backOutUp animate__infinite"></i></li>`);
    }
    else if (i >= 12 && i <= 22) {
      if (i == 15 || i == 19) {
        $(".winning-icons").append(`<li><i class="far fa-smile-beam animate__animated animate__backOutDown animate__infinite"></i></li>`);
      }
      else
        $(".winning-icons").append(`<li><i class="far fa-smile animate__animated animate__backOutDown animate__infinite"></i></li>`); 
    }
  }
}

// Create sad icons animating on the screen when the game is over!
guessApp.displayLosingIcons = function () {
  // Display the '22' sad icons animating on the screen when the game is lost :)
  for (i = 1; i <= 22; i++) {

    if (i >= 1 && i <= 11) {
      if (i == 4 || i == 8) {
        $(".game-over-icons").append(`<li><i class="fas fa-fire animate__animated animate__backOutUp animate__infinite"></i></li>`);
      }
      else
        $(".game-over-icons").append(`<li><i class="fas fa-sad-tear animate__animated animate__backOutUp animate__infinite"></i></li>`);
    }
    else if (i >= 12 && i <= 22) {
      if (i == 15 || i == 19) {
        $(".game-over-icons").append(`<li><i class="fas fa-fire animate__animated animate__backOutDown animate__infinite"></i></li>`);
      }
      else
        $(".game-over-icons").append(`<li><i class="fas fa-sad-tear animate__animated animate__backOutDown animate__infinite"></i></li>`);
    }
  }
}


// Check to see if the user has answered correctly!
guessApp.findMatch = function () {

  $("form").on("submit", function (event) {
    event.preventDefault();

    $('.winning-icons').empty();

    let $userInput = $("#guess").val();

    if ($userInput === myAnswer) {
      clearInterval(timerVar);
      guessApp.displayWinningIcons();
      seconds = 10;
      $timer.html("00");
      $playPage.hide();
      $("#winner-message").addClass("animate__animated animate__backInDown animate__slow");
      $winningPage.show();
    }

    $("#guess").val("");
  })

}

// Display the relevant 'sections' depending on which button is clicked: Start Game, Game Won, or Game Lost
guessApp.buttonEventListeners = function () {
  $("#play-again").on("click", function () {

    // select a new random index, word and image
    randomAnswerIndex = randomizer(answerArray); 
    myAnswer = answerArray[randomAnswerIndex];
    guessApp.displayInfo(randomAnswerIndex, myAnswer);

    $gameOverPage.hide();
    timerVar = setInterval(guessApp.countTimer, 1000);
    $playPage.show();
    $('#guess').focus(); // place the cursor inside the input box when page is loaded

    

  });

  $("#restart").on("click", function () {

    // select a new random index, word and image
    randomAnswerIndex = randomizer(answerArray);
    myAnswer = answerArray[randomAnswerIndex];
    guessApp.displayInfo(randomAnswerIndex, myAnswer);

    $("#winner-message").removeClass("animate__animated animate__backInDown animate__slow");
    $winningPage.hide();
    timerVar = setInterval(guessApp.countTimer, 1000);
    $playPage.show();
    $('#guess').focus();

  });

  $(".start").on("click", function () {

    timerVar = setInterval(guessApp.countTimer, 1000);
    $instructionsPage.hide();
    $playPage.show();
    $('#guess').focus();

  });
}

// Document Ready function
$ (function() {

  guessApp.init();

});