
// Create app namespace to hold all methods
const guessApp = {};

// Create an object (with arrays inside) which consists of the correct answer words along with their correct number of spaces

guessApp.answers = {
  // word: ["kite", "basketball", "tide", "heat", "wheat", "darkness", "coding", "olympics", "snowflake", "fireworks"],
  // picture: ["kite.jpg", "basketball.jpg", "tide.jpg", "heat.jpg", "wheat.jpg", "darkness.jpg"],
  // spaces: ["_ _ _ _ _", "_ _ _ _ _ _ _ _ _ _", "_ _ _ _", "_ _ _ _", "_ _ _ _ _", "_ _ _ _ _ _ _ _"]

  word: ["kite", "coding"]
}

let myAnswer;
let timerVar;
let seconds = 10;

const randomizer = function (array) {
  return Math.floor (Math.random () * array.length);
}

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

  guessApp.displayInfo();
}

// Display the randomly selected image and "_" onto the screen
guessApp.displayInfo = function () {
  let underScores = "";
  let answerArray = guessApp.answers.word;

  let randomAnswerIndex = randomizer(answerArray);
  myAnswer = answerArray[randomAnswerIndex];

  $image.attr("src", `./assets/image${randomAnswerIndex}.jpg`);

  for (let i = 0; i < myAnswer.length; i++) {
    underScores = underScores + "_" + " ";
    $spaces.text(`${underScores}`);
  }

  guessApp.findMatch();

}

guessApp.countTimer = function () {
  seconds--;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (seconds <= 0) {
    clearInterval(timerVar);
    seconds = 10;
    $timer.html("00");
    $playPage.hide();
    $gameOverPage.show();
  }
  $timer.html(`${seconds} Sec...`);

}

guessApp.findMatch = function () {

  $("form").on("submit", function (event) {
    event.preventDefault();

    let $userInput = $("#guess").val();

    if ($userInput === myAnswer) {
      clearInterval(timerVar);
      seconds = 10;
      $timer.html("00");
      $playPage.hide();
      $winningPage.show();
    }

    $("#guess").val("");
  })

  guessApp.buttonEventListeners();

}

guessApp.buttonEventListeners = function () {
  $("#play-again").on("click", function () {

    $gameOverPage.hide();
    timerVar = setInterval(guessApp.countTimer, 1000);
    $playPage.show();

  });

  $("#restart").on("click", function () {

    $winningPage.hide();
    timerVar = setInterval(guessApp.countTimer, 1000);
    $playPage.show();

  });

  $(".start").on("click", function () {

    timerVar = setInterval(guessApp.countTimer, 1000);
    $instructionsPage.hide();
    $playPage.show();

  });
}





$ (function() {

  guessApp.init();

});