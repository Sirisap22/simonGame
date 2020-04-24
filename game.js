let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let isFunctionExecuted = false;

let level = 0;

let isToturialClicked = false;

//Initialize tutorial page to invisible.
$("div.tutorial-background").toggle();

// If nextSequence never activate before this can activate to start the game.
$(document).keydown(function () {
  // To check if function is already activated or not.
  if (!isFunctionExecuted && !isToturialClicked) {
    $("#start-button").hide();
    $("footer").text("");
    isFunctionExecuted = true;
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];

  // To change h1 title.
  $("#level-title").text("Level " + String(level));
  level++; // Increment Level.

  // Generate a new random number between 0 and 3, and store it in varble called randomNumber.
  let randomNumber = Math.floor(Math.random() * 4);

  // To change from random number to colour using array[index].
  let randomChosenColour = buttonColours[randomNumber];

  // Play the random button sound.
  playSound(randomChosenColour);

  // Add the new randomChosenColour generated to the end of the gamePattern using push() method.
  gamePattern.push(randomChosenColour);

  // Flash animation using fadeOut,fadeIn methods.
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

// To check which button is pressed.
$(".btn").click(function () {
  // To get id of the clicked button and stored it in variable called userChosenColour.
  let userChosenColour = $(this).attr("id");

  // Add the contents of the variable userChosenColour created in nextSqeuence() to the end of userClickedPattern array.
  userClickedPattern.push(userChosenColour);

  let checkedAnswer = checkAnswer(userClickedPattern.length - 1); //Have to minus 1 because of index start at 0.

  // Play clicked button sound.
  playSound(userChosenColour);

  //Play pressed animation.
  animatePress(userChosenColour);

  //To next Level.
  if (checkedAnswer && userClickedPattern.length === gamePattern.length) {
    setTimeout(nextSequence, 1000);
  }
  //If game over.
  else if (!checkedAnswer) {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    let wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("#start-button").css("width", "124px");
    $("#start-button").text("Restart");
    $("#start-button").show();

    startOver();
  }
});

function playSound(name) {
  let buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

//Pressed button animation.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Call to check answer.
function checkAnswer(currentClickedLevel) {
  if (userClickedPattern[currentClickedLevel] === gamePattern[currentClickedLevel]) {
    return true;
  } else return false;
}
// Altenrative way
// function checkAnswer() {
//   for (let i = 0; i < userClickedPattern.length; i++) {
//     if (userClickedPattern[i] !== gamePattern[i]) {
//       return false;
//     }
//   }
//   return true;
// }

//Call to reset everything to initialize value.
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isFunctionExecuted = false;
}

//To open toturial.
$(".fa-question-circle").click(function () {
  isToturialClicked = !isToturialClicked;
  $("div.tutorial-background").toggle();
  $(".fa-question-circle").addClass("q-pressed");
  setTimeout(function () {
    $(".fa-question-circle").removeClass("q-pressed");
  }, 100);
});

// Start button.
$("#start-button").click(function () {
  // To check if function is already activated or not.
  if (!isFunctionExecuted && !isToturialClicked) {
    $("#start-button").hide();
    $("footer").text("");
    isFunctionExecuted = true;
    nextSequence();
  }
});
