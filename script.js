
// Create app namespace to hold all methods
const guessApp = {};

// Create an object (with arrays inside) which consists of the correct answer words that the user has to guess!
guessApp.answers = {
  word: ["kite", "coding", "basketball", "tide", "heat", "wheat", "darkness", "olympics", "snowflakes", "fireworks", "studying", "round", "sandpaper", "moth", "realm", "temper", "creator", "nutmeg", "soul", "trawler", "population", "telepathy", "retire", "enemy", "regret", "writhe", "blacksmith", "stuff", "opaque", "rhythm", "improve", "atlantis", "insurance", "language", "password", "tribe", "bribery", "vip", "depth", "carat", "reaction", "hobby", "cramp", "discovery", "friction", "property", "feeling", "panic", "tutor", "galaxy", "comparison", "wish"]
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
let streak = 0;
let seconds = 60;

// screen breakpoint sizes
const breakpointSizes = [
  window.matchMedia("(max-width: 1241px)"),
  window.matchMedia("(max-width: 1040px)"),
  window.matchMedia("(max-width: 800px)"),
  window.matchMedia("(max-width: 650px)"),
];

// Save the font awesome icon names to global variables to be re-used later in a for loop
let numberOfIcons = 22;
const winningIcon = "far";
const winningIconName = "fa-smile-beam";
// const winningIconNameTwo = "fa-smile-beam";
const losingIcon = "fas";
const losingIconName = "fa-sad-tear";
// const losingIconNameTwo = "fa-fire";

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

  $timesRunningOut = $(".flex-timer");
  $timesRunningOut.removeClass("timer-alert");

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
    $timesRunningOut.addClass("timer-alert"); // animate the timer to get the user's attention when timer is less than 10 seconds!
    $("label.sr-only").text("Times Running Out, Less Than 10 Sec, Hurry!!"); 
    seconds = "0" + seconds;
  }
  // User loses the game, then reset settings and display the icons + messages 
  if (seconds <= 0) {
    clearInterval(timerVar);
    guessApp.displayIcons(numberOfIcons)
    seconds = 60;
    $timer.html("00");
    $timesRunningOut.removeClass("timer-alert");
    $("label.sr-only").text("Enter Your Guess Here");
    $playPage.hide();
    $resultsPage.show();
    $message.addClass("animate__animated animate__backInDown animate__slow game-over");
    $message.html("TIMES UP, GREAT WORK!");
    $resultsBtn.html("Play Again");

    // check to dynamically reduce the # of icons based on screen size (desktop, tablet or mobile devices)
    guessApp.reduceNumOfIcons();
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
      streak++;
      $(".streak").html(`Your <span>STREAK</span> is: ${streak}!`);
      resetGameSettings();
      seconds = 60;
      timerVar = setInterval(guessApp.countTimer, 1000);
      $timer.html("00");
      $(".flex-timer").removeClass("timer-alert");

      // check to dynamically reduce the # of icons based on screen size (desktop, tablet or mobile devices)
      guessApp.reduceNumOfIcons();
    }

    $("#guess").val(""); // empty the user input field after a wrong answer

  })
}

// Reset all game settings 
const resetGameSettings = function () {
  // select a new random index, word and image
  randomAnswerIndex = randomizer(answerArray);
  myAnswer = answerArray[randomAnswerIndex];
  guessApp.displayInfo(randomAnswerIndex, myAnswer);

  // remove animated classes from H2 to prevent JS being loaded onto the screen (looks weird so thanks to removeClass & addClass!)
  // $message.removeClass("animate__animated animate__backInDown animate__slow winner game-over");
  $message.removeClass("animate__animated animate__backInDown animate__slow game-over");
  $resultsPage.hide();
}

// Display the relevant 'sections' depending on which buttons are clicked: PLAY AGAIN or START
guessApp.buttonEventListeners = function () {
  // Show the play area page when user hits "PLAY AGAIN"
  $resultsBtn.on("click", function () {
    resetGameSettings();
    // start the timer and show the Play Area
    timerVar = setInterval(guessApp.countTimer, 1000);
    streak = 0;
    $('.streak').empty();
    $playPage.show();
    // place the cursor inside the inputbox when page loads to give user good experience!
    $('#guess').focus();
  });

  // Show the home instructions page when user hits "HOME" button
  $homePageBtn.on("click", function () {
    resetGameSettings();
    streak = 0;
    $('.streak').empty();
    $instructionsPage.show();
  })

  // Start the game!
  $(".start").on("click", function () {
    timerVar = setInterval(guessApp.countTimer, 1000);
    $instructionsPage.hide();
    $playPage.show();
    $('#guess').focus();
  });
}

// Create alternating happy & sad icons animating on the screen when the game is over for all device screen sizes!
guessApp.displayIcons = function (numberOfIcons) {
  for (i = 1; i <= numberOfIcons; i++) {
    // desktop icons width greater than 1241px
    if (numberOfIcons === 22) {
      if (i >= 1 && i <= 11) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
        else 
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
      }
      else if (i >=12 && i<= numberOfIcons) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
        else
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
      }
    }
    // large desktops max-width of 1241px
    else if (numberOfIcons === 16) {
      if (i >= 1 && i <= 8) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
        else
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
      }
      else if (i >= 9 && i <= numberOfIcons) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
        else
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
      }
    }
    // small desktops/tablets max-width of 1040px
    else if (numberOfIcons === 12) {
      if (i >= 1 && i <= 6) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
        else
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
      }
      else if (i >= 7 && i <= numberOfIcons) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
        else
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
      }
    }
    // small tablets/landscape mobiles max-width of 800px
    else if (numberOfIcons === 8) {
      if (i >= 1 && i <= 4) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
        else
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
      }
      else if (i >= 5 && i <= numberOfIcons) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
        else
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
      }
    }
    // small tablets/landscape mobiles max-width of 650px
    else if (numberOfIcons === 4) {
      if (i >= 1 && i <= 2) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
        else
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutUp animate__infinite"></i></li>`);
      }
      else if (i >= 3 && i <= numberOfIcons) {
        if (i % 2 !== 0)
          $resultsIcons.append(`<li><i class="${winningIcon} ${winningIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
        else
          $resultsIcons.append(`<li><i class="${losingIcon} ${losingIconName} animate__animated animate__backOutDown animate__infinite"></i></li>`);
      }
    }
  }
}

// Reduce the number of icons as the screen gets smaller dynamically!
guessApp.reduceNumOfIcons = function () {
  for (let i = 0; i < breakpointSizes.length; i++) {
    guessApp.mediaQueryResponse(breakpointSizes[i]);
    breakpointSizes[i].addEventListener("change", guessApp.mediaQueryResponse);
  }
}

// Media Query function to show the different state changes
guessApp.mediaQueryResponse = function (x) {

  $('.results-icons').empty();
  // small/narrow/landscape mobile devices from 300px to 650px
  if (breakpointSizes[0].matches && breakpointSizes[1].matches && breakpointSizes[2].matches && breakpointSizes[3].matches)  { 
    numberOfIcons = 4;
    if ($message.hasClass("game-over")) 
      guessApp.displayIcons(numberOfIcons);
  }
  // screens upto max-width 800px
  else if (breakpointSizes[0].matches && breakpointSizes[1].matches && breakpointSizes[2].matches) {
    numberOfIcons = 8;
    if ($message.hasClass("game-over")) 
      guessApp.displayIcons(numberOfIcons);
  }
  // screens upto max-width 1040px
  else if (breakpointSizes[0].matches && breakpointSizes[1].matches) {
    numberOfIcons = 12;
    if ($message.hasClass("game-over")) 
      guessApp.displayIcons(numberOfIcons);
  }
  // screens upto max-width 1241px
  else if (breakpointSizes[0].matches) {
    numberOfIcons = 16;
    if ($message.hasClass("game-over")) 
      guessApp.displayIcons(numberOfIcons);
  }
  // screens greater than 1241px
  else {  
    numberOfIcons = 22;
    if ($message.hasClass("game-over")) 
      guessApp.displayIcons(numberOfIcons);
  }
}

// Document Ready function
$(function () {

  guessApp.init();

});
    
