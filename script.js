
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
let seconds = 12;

//Start GuessApp
guessApp.init = function () {
  // cache all jquery selectors 
  $instructionsPage = $("header");
  $startBtn = $(".start");
  $playPage = $(".play");
  $homePageBtn = $(".home-page-btn");

  $resultsPage = $(".results");
  $message = $(".message");
  $resultsBtn = $(".results-btn");
  $resultsIcons = $(".results-icons");

  $timer = $("#timer");
  $spaces = $("#spaces");

  $image = $("#image");
  $("#guess").val("");

  $(".flex-timer").removeClass("timer-alert");

  $resultsPage.hide();
  $playPage.hide();

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
// Update H2, Button and icons accordingly if user does NOT win
guessApp.countTimer = function () {
  
  $('.results-icons').empty();
  seconds--;

  if (seconds < 10) {
    $(".flex-timer").addClass("timer-alert"); // animate the timer to get the user's attention when timer is less than 10 seconds!
    seconds = "0" + seconds;
  }
  if (seconds <= 0) {
    clearInterval(timerVar);
    guessApp.displayLosingIcons();
    seconds = 15;
    $timer.html("00");
    $(".flex-timer").removeClass("timer-alert");
    $playPage.hide();
    $resultsPage.show();
    $message.addClass("animate__animated animate__backInDown animate__slow");
    $message.html("GAME OVER!");
    $resultsBtn.html("Play Again");
    $resultsPage.show();
  }
  $timer.html(`${seconds} Sec...`);

}

// Check to see if the user has answered correctly!
// Update H2, Button and icons accordingly if user wins
guessApp.findMatch = function () {

  $("form").on("submit", function (event) {
    event.preventDefault();

    $('.results-icons').empty();  // empty all icons 

    let $userInput = $("#guess").val();

    if ($userInput === myAnswer) {
      clearInterval(timerVar);
      guessApp.displayWinningIcons();
      seconds = 15;
      $timer.html("00");
      $(".flex-timer").removeClass("timer-alert");
      $playPage.hide();
      $message.addClass("animate__animated animate__backInDown animate__slow");
      $message.html("You Won! Congrats!");
      $resultsBtn.html("Restart");
      $resultsPage.show();
    }

    $("#guess").val(""); // empty the user input field after a wrong answer

  })

}

// Create winning icons animating on the screen when user wins the game!
guessApp.displayWinningIcons = function () {
  // Display the '22' happy icons animating on the screen when user wins the game :)
  for (i = 1; i <= 22; i++) {

    if (i >= 1 && i <= 11) {
      if (i == 4 || i == 8) {
        $resultsIcons.append(`<li><i class="far fa-smile-beam animate__animated animate__backOutUp animate__infinite"></i></li>`);
      }
      else
        $resultsIcons.append(`<li><i class="far fa-smile animate__animated animate__backOutUp animate__infinite"></i></li>`);
    }
    else if (i >= 12 && i <= 22) {
      if (i == 15 || i == 19) {
        $resultsIcons.append(`<li><i class="far fa-smile-beam animate__animated animate__backOutDown animate__infinite"></i></li>`);
      }
      else
        $resultsIcons.append(`<li><i class="far fa-smile animate__animated animate__backOutDown animate__infinite"></i></li>`);
    }
  }
}

// Create sad icons animating on the screen when the game is over!
guessApp.displayLosingIcons = function () {
  // Display the '22' sad icons animating on the screen when the game is lost :)
  for (i = 1; i <= 22; i++) {

    if (i >= 1 && i <= 11) {
      if (i == 4 || i == 8) {
        $resultsIcons.append(`<li><i class="fas fa-fire animate__animated animate__backOutUp animate__infinite"></i></li>`);
      }
      else
        $resultsIcons.append(`<li><i class="fas fa-sad-tear animate__animated animate__backOutUp animate__infinite"></i></li>`);
    }
    else if (i >= 12 && i <= 22) {
      if (i == 15 || i == 19) {
        $resultsIcons.append(`<li><i class="fas fa-fire animate__animated animate__backOutDown animate__infinite"></i></li>`);
      }
      else
        $resultsIcons.append(`<li><i class="fas fa-sad-tear animate__animated animate__backOutDown animate__infinite"></i></li>`);
    }
  }
}

// Reset all game settings 
const resetGameSettings = function () {
  // select a new random index, word and image
  randomAnswerIndex = randomizer(answerArray);
  myAnswer = answerArray[randomAnswerIndex];
  guessApp.displayInfo(randomAnswerIndex, myAnswer);

  // remove animated classes from H2 to prevent JS being loaded onto the screen (looks weird so thanks to removeClass & addClass!)
  $message.removeClass("animate__animated animate__backInDown animate__slow");
  $resultsPage.hide();
}

// Display the relevant 'sections' depending on which button is clicked: Start Game or Results Button (Game Won or Game Lost)
guessApp.buttonEventListeners = function () {
  // Show the play area page when user hits "RESTART"
  $resultsBtn.on("click", function () {
    resetGameSettings();
    // start the timer and show the Play Area
    timerVar = setInterval(guessApp.countTimer, 1000);
    $playPage.show();
    // place the cursor inside the inputbox when page loads to give user good experience!
    $('#guess').focus();
  });

  // Show the home instructions page when user hits "HOME"
  $homePageBtn.on("click", function () {
    resetGameSettings();
    $instructionsPage.show();
  })

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