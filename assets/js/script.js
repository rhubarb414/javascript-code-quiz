//select container for the scoreboard "hyperlink" in the top bar
var topBarEl = document.querySelector(".top-bar");

//main variables for starting and playing the quiz
var content = document.querySelector(".content");
var beginButton = document.querySelector(".begin-button");
var beginButtonText = document.querySelector("#begin-button-text");
var gameButtons = document.querySelector(".game-buttons");
var answerButtons = document.querySelectorAll(".answer-button");
var answerButtonText = document.querySelectorAll("#answer-button-text");
var rightWrongEl = document.querySelector(".right-wrong"); //container for right/wrong messages
var rightWrongPtag = document.createElement("p");
var timerEl = document.querySelector("#timer");
var countdownSeconds = 60;
var questions = [
  ["Question 1", "Right Answer", "Answer 2", "Answer 3", "Answer 4"],
  ["Question 2", "Answer 1", "Right Answer", "Answer 3", "Answer 4"],
  ["Question 3", "Answer 1", "Answer 2", "Right Answer", "Answer 4"],
  ["Question 4", "Answer 1", "Answer 2", "Answer 3", "Right Answer"],
];

//post-quiz variables for scoreboard and play again
var playerName = document.getElementById("name");
var score = null; //assigned during gameOver
var scoreboard = {
  name: [],
  score: [],
};
var saveScoreRow = document.querySelector(".save-score-row");
var saveScoreBtn = document.getElementById("save-score-btn");

var scoreboardOl = document.querySelector(".scoreboard"); //ordered list for scoreboard entries
var scoreboardBtns = document.querySelector(".scoreboard-buttons");
var clearScoresBtn = document.getElementById("clear-scores-button");
var playAgainBtn = document.getElementById("play-again-button");

var stopTimer = false; //boolean used to stop the timer outside of reaching zero

var currentQuestion = 0; //index for questions array to iterate through questions and answers

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
  } else if (
    content.textContent === questions[0][0] && // check if player is on question 1
    event.target.textContent === questions[0][1] // check to see if right answer was clicked
  ) {
    console.log(event.target, "Right Answer!");
    correct();
    nextQuestion();
  } else if (
    content.textContent === questions[1][0] && // check if player is on question 2
    event.target.textContent === questions[1][2]
  ) {
    console.log(event.target, "Right Answer!");
    correct();
    nextQuestion();
  } else if (
    content.textContent === questions[2][0] && // check if player is on question 3
    event.target.textContent === questions[2][3]
  ) {
    console.log(event.target, "Right Answer!");
    correct();
    nextQuestion();
  } else if (
    content.textContent === questions[3][0] && // check if player is on final question
    event.target.textContent === questions[3][4] // and answers correctly
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

function gameOver() {
  //stop timer
  stopTimer = true;

  //set score to be the remaining time
  score = countdownSeconds;

  //clear last question from .content
  content.textContent = "";

  //hide answer buttons
  for (let index = 0; index < answerButtons.length; index++) {
    answerButtons[index].setAttribute("style", "display: none;");

    //update .content to show user their score
    function showScore() {
      content.innerHTML = `<h1>Finished!</h1> </p>You earned a score of ${score}.`;
    }
    //wait until timer stops before displaying score
    setTimeout(showScore, 1000);

    //show save score form
    saveScoreRow.setAttribute("style", "display: block;");
  }
}

function saveScore() {
  //populate scoreboard[] with previous scores
  getStoredScores();

  //if no scores in scorebard, save the new score without sorting
  if (scoreboard.score.length === 0) {
    scoreboard.name.push(playerName.value);
    scoreboard.score.push(score);
  } else {
    console.log("got to else");
    // var scoreboardLength = scoreboard.score.length;
    for (let index = 0; index < scoreboard.score.length; index++) {
      console.log(
        `index= ${index} and scoreboard length = ${scoreboard.score.length}`
      );
      console.log("got to iteration " + index);
      console.log(
        `score = ${score} and comparison score = ${scoreboard.score[index]}`
      );
      //insert new score ahead of lower scores
      if (score > scoreboard.score[index]) {
        console.log(
          `score=${score} and scoreboard.score[index] = ${scoreboard.score[index]} at position ${index}`
        );
        scoreboard.score.splice(index, 0, score);
        scoreboard.name.splice(index, 0, playerName.value);
        break;
      } else if (
        score <= scoreboard.score[index] &&
        score <= scoreboard.score[index + 1]
      ) {
        console.log(
          `skipped an iteration between ${scoreboard.score[index]} and ${
            scoreboard.score[index + 1]
          }`
        );
        //keep moving down the scoreboard if score is smaller than score[index] and the following score.
        continue;
      } else {
        //add score to end if not larger than any existing score
        scoreboard.score.push(score);
        scoreboard.name.push(playerName.value);
        break;
      }
    }
  }

  //add new player name and score to scoreboard[]

  //store up-to-date scoreboard
  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));

  addScoresToDom();
  //need to call sortScoreboard();
  showScoreboard();
}

//call saveScore when player clicks save-score-button
saveScoreBtn.addEventListener("click", function (event) {
  event.preventDefault();
  saveScore();
});

//creates <li> tags for each scoreboard entry, appends to scoreboard <ol>
function addScoresToDom() {
  for (let index = 0; index < scoreboard.name.length; index++) {
    var name = scoreboard.name[index];
    var score = scoreboard.score[index];

    var li = document.createElement("li");
    li.textContent = name + " – " + score;
    li.setAttribute("class", "scoreboard-row");

    scoreboardOl.appendChild(li);
    console.log("li = ", li, "scoreboard = ", scoreboardOl); //delete
  }
}

function sortScoreboard() {
  for (
    let comparisonIndex = 0;
    comparisonIndex < scoreboard.name.length;
    comparisonIndex++
  ) {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
    }
  }
}
function showScoreboard() {
  saveScoreRow.setAttribute("style", "display: none;");
  scoreboardOl.setAttribute("style", "display: block;");
  scoreboardBtns.setAttribute("style", "display: inline-block;");

  content.innerHTML = "<h1>Scoreboard</h1>";
}

//retrieve previous scoreboard entries from local storage
function getStoredScores() {
  //exit function if localstorage scoreboard is empty or doesn't exist
  if (!localStorage.getItem("scoreboard")) {
    return;
  }
  var storedScores = JSON.parse(localStorage.getItem("scoreboard"));

  if (storedScores !== null) {
    scoreboard = storedScores;
  }
}

function clearScoreboard() {
  localStorage.setItem("scoreboard", "");
  scoreboardOl.setAttribute("style", "display: none;");
}

function newGame() {}

// when Scoreboard link is clicked in top bar: stops game, shows scoreboard
topBarEl.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("a") === true) {
    //hide Begin button if it hasn't been clicked
    beginButton.setAttribute("style", "display: none;");
    //stopTimer if
    stopTimer = true;

    getStoredScores();
    addScoresToDom();
    showScoreboard();
  }
});

//add functionality play-again button and clear-scoreboard button
scoreboardBtns.addEventListener("click", function (event) {
  if (event.target.textContent === clearScoresBtn.textContent) {
    clearScoreboard();
  } else if (event.target.textContent === playAgainBtn.textContent) {
    location.reload();
  }
});
