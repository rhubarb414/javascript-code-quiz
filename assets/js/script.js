var content = document.querySelector(".content");
var beginButton = document.querySelector(".begin-button");
var beginButtonText = document.querySelector("#begin-button-text");
var gameButtons = document.querySelector(".game-buttons");
var answerButtons = document.querySelectorAll(".answer-button");
var answerButtonText = document.querySelectorAll("#answer-button-text");
var endButton = document.querySelector(".end-button");
var rightWrongEl = document.querySelector(".right-wrong");
var rightWrongPtag = document.createElement("p");
var timerEl = document.querySelector("#timer");
var countdownSeconds = 60;

var playerName = document.getElementById("name");
var saveScoreBtn = document.getElementById("save-score");

var stopTimer = false;

var currentQuestion = 0;

var score = null;

var questions = [
  ["Question 1", "Right Answer", "Answer 2", "Answer 3", "Answer 4"],
  ["Question 2", "Answer 1", "Right Answer", "Answer 3", "Answer 4"],
  ["Question 3", "Answer 1", "Answer 2", "Right Answer", "Answer 4"],
  ["Question 4", "Answer 1", "Answer 2", "Answer 3", "Right Answer"],
];

// *** Begin quiz section – all game mechanics ***

// Called when Begin button is clicked
function startQuiz() {
  //hide Begin button
  beginButton.setAttribute("style", "display: none;");

  //display answer buttons
  for (let index = 0; index < answerButtons.length; index++) {
    answerButtons[index].setAttribute("style", "display: block;");
  }

  // populate first question
  nextQuestion();

  // start the clock!
  startTimer();
}

//add event listeners to .game-buttons div
gameButtons.addEventListener("click", function (event) {
  if (event.target.textContent == "Begin") {
    return; //keep wrong() from firing at start of the game
  } else if (event.target.textContent == "Play again?") {
    //reload game if player hits "Play again?"
    location.reload();
  } else if (
    content.textContent == questions[0][0] && // check if player is on question 1
    event.target.textContent == questions[0][1] // check to see if right answer was clicked
  ) {
    console.log(event.target, "Right Answer!");
    correct();
    nextQuestion();
  } else if (
    content.textContent == questions[1][0] && // check if player is on question 2
    event.target.textContent == questions[1][2]
  ) {
    console.log(event.target, "Right Answer!");
    correct();
    nextQuestion();
  } else if (
    content.textContent == questions[2][0] && // check if player is on question 3
    event.target.textContent == questions[2][3]
  ) {
    console.log(event.target, "Right Answer!");
    correct();
    nextQuestion();
  } else if (
    content.textContent == questions[3][0] && // check if player is on final question
    event.target.textContent == questions[3][4] // and answers correctly
  ) {
    console.log(event.target, "Right Answer!");
    correct();
    console.log("Thanks for playing!");
    gameOver();
  } else if (content.textContent == questions[3][0]) {
    //check if play answers final quesiton wrong
    console.log(event.target, "Thanks for playing!");
    wrong();
    gameOver();
  } else {
    console.log(event.target, "Wrong Answer!");
    wrong();
    nextQuestion();
  }
});

// Call startQuiz when Begin button is clicked
beginButton.addEventListener("click", startQuiz);

function nextQuestion() {
  //add question text
  content.textContent = questions[currentQuestion][0];

  //add answer button text
  for (let index = 0; index < answerButtonText.length; index++) {
    answerButtonText[index].textContent = questions[currentQuestion][index + 1];
  }
  currentQuestion++;
}

function gameOver() {
  //stop timer
  stopTimer = true;

  //set score to be the remaining time
  score = countdownSeconds;

  //clear last question from .content
  content.textContent = "";

  //update .content to show user their score
  function showScore() {
    content.textContent = "You earned a score of " + score;
  }
  //wait until timer stops before displaying score
  setTimeout(showScore, 1000);

  //show End button
  endButton.setAttribute("style", "display: block;");

  //hide answer buttons
  for (let index = 0; index < answerButtons.length; index++) {
    answerButtons[index].setAttribute("style", "display: none;");
  }
}

//show message after correct answer
function correct() {
  rightWrongPtag.textContent = "Correct!";
  rightWrongEl.appendChild(rightWrongPtag);
  rightWrongEl.setAttribute("style", "display: block; ");
  setTimeout(hideRightWrongEl, 1000); // hide message after 1 second
}

//show message after wrong answer and subtract 10s from timer
function wrong() {
  // Subtract 10 seconds if there is more than 10 seconds left
  if (countdownSeconds > 10) {
    countdownSeconds -= 10;
    // otherwise take the timer to zero instead of going negative
  } else {
    stopTimer = true;
    countdownSeconds = 0;
  }
  rightWrongPtag.textContent = "Wrong.";
  rightWrongEl.appendChild(rightWrongPtag);
  rightWrongEl.setAttribute("style", "display: block;");
  setTimeout(hideRightWrongEl, 1000); // hide message after 1 second
}

// called during correct() and wrong() to re-hide the right and wrong messages.
function hideRightWrongEl() {
  rightWrongEl.setAttribute("style", "display; none;");
}

function startTimer() {
  var timer = setInterval(function () {
    countdownSeconds--;
    timerEl.textContent = "Time Left: " + countdownSeconds;

    if (countdownSeconds === 0 || stopTimer === true) {
      // Stop timer
      clearInterval(timer);
      // Prevent timer from going below zero since setInterval causes a delay
      if (countdownSeconds < 0) {
        countdownSeconds = 0;
        timerEl.textContent = "Time Left: 0";
      }
      gameOver();
    }
  }, 1000);
}

// *** Begin post-quiz section – scoreboard and reset mechanics ***

function saveScore() {
  var playerScore = {
    name: playerName.value,
    score: score,
  };
  localStorage.setItem("playerScore", JSON.stringify(playerScore));
}

//call saveScore when player clicks save-score button
saveScoreBtn.addEventListener("click", function (event) {
  event.preventDefault();
  saveScore();
});

function addToScoreboard() {}
function showScoreboard() {}
