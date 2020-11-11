
// Create app namespace to hold all methods
const guessApp = {};

// Create an object (with arrays inside) which consists of the correct answer words along with their correct number of spaces

guessApp.answers = {
  // word: ["kite", "basketball", "tide", "heat", "wheat", "darkness", "coding", "olympics", "snowflake", "fireworks"],
  // picture: ["kite.jpg", "basketball.jpg", "tide.jpg", "heat.jpg", "wheat.jpg", "darkness.jpg"],
  // spaces: ["_ _ _ _ _", "_ _ _ _ _ _ _ _ _ _", "_ _ _ _", "_ _ _ _", "_ _ _ _ _", "_ _ _ _ _ _ _ _"]

  word: ["kite", "coding"]
}

const randomizer = function (array) {
  return Math.floor (Math.random () * array.length);
}





$(document).ready(function () {

  $(".winner").hide();
  $(".play").hide();
  $(".game-over").hide();

  let timerVar;
  let seconds = 10;
  let underScores = "";

  let randomAnswerIndex = randomizer(guessApp.answers.word);

  let answer = guessApp.answers.word[randomAnswerIndex];


  $("#image").attr("src", `./assets/image${randomAnswerIndex}.jpg`);

  for (let i=0; i< answer.length; i++) {

    underScores = underScores + "_" + " ";
    $("#spaces").text(`${underScores}`);

  }


  $("form").on("submit", function (event) {
    event.preventDefault();

    let userInput = $("#guess").val();

    if (userInput === answer) {
      clearInterval(timerVar);
      seconds = 10;
      $("#timer").html("00");
      $(".play").hide();
      $(".winner").show();
    }
    
    $("#guess").val("");

    console.log(userInput);

  })

  $("#play-again").on("click", function () {

    $(".game-over").hide();
    timerVar = setInterval(countTimer, 1000);
    $(".play").show();

  });

  $("#restart").on("click", function () {

    $(".winner").hide();
    timerVar = setInterval(countTimer, 1000);
    $(".play").show();

  });

  $(".start").on("click", function () {

    timerVar = setInterval(countTimer, 1000);
    $("header").hide();
    $(".play").show();
    
  });

  const countTimer = function () {
    seconds--;
    if (seconds < 10){
      seconds = "0" + seconds;}
    if (seconds <= 0) {
      clearInterval(timerVar);
      seconds = 10;
      $("#timer").html("00");
      $(".play").hide();
      $(".game-over").show();
    }
    $("#timer").html(`${seconds} Sec...`);
  }


});