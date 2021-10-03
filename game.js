var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;

var level = 0;

function nextSequence() {
  //Génère un nombre aléatoire
  var randomNumber = Math.floor(Math.random() * 4);

  //Assigne le nombre à la couleur correspondante dans l'array
  var randomChosenColor = buttonColors[randomNumber];

  //Met la couleur générée dans le GamePattern
  gamePattern.push(randomChosenColor);

  //Anime la couleur générée
  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);

  //Jouer le son généré
  playSound(randomChosenColor);

  //Incrémenter la valeur de Level
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];

  console.log(randomNumber);
  console.log(randomChosenColor);
  console.log(gamePattern);
}

//EventListener quand on clique sur un bouton
$(".btn").on("click", function (){

  var userChosenColor =  $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  console.log(userChosenColor);
  console.log(userClickedPattern);
});

function playSound(name) {
  //Joue l'audio correspondant à la couleur générée
  var audio = {};
  audio["randomSoundButton"] = new Audio();
  audio["randomSoundButton"].src = "sounds/" + name + ".mp3";
  audio["randomSoundButton"].play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//EventListener au document pour voir si on appuie sur une touche
$(document).on("keydown", function () {
  if (gameStarted) {
    $(document).off("keydown");
  } else {
  gameStarted = true;
  $("#level-title").text("Level " + level);
  nextSequence();
}
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
    $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, press any key to restart the game.");
    startOver();
    console.log("wrong");
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
