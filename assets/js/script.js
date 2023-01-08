var content = document.querySelector(".content");
var beginButton = document.querySelector("#begin-button");
var buttons = document.querySelector(".buttons");
var answerButtons = document.querySelectorAll(".answer-button");
var answerOne = document.querySelector("#answer-one");
var answerTwo = document.querySelector("#answer-two");
var answerThree = document.querySelector("#answer-three");
var answerFour = document.querySelector("#answer-four");

var answerText = document.querySelectorAll(".answer-button-text");

var rightAnswer = null; // will be set one of the answer buttons for each question
var wrongAnswerOne = null;
var wrongAnswerTwo = null;
var wrongAnswerThree = null;

currentQuestion = 0;

var questions = {
  questionOne: [
    "Question 1",
    "Right Answer",
    "Answer 2",
    "Answer 3",
    "Answer 4",
  ],
  questionTwo: [
    "Question 2",
    "Answer 1",
    "Right Answer",
    "Answer 3",
    "Answer 4",
  ],
  questionThree: [
    "Question 3",
    "Answer 1",
    "Answer 2",
    "Right Answer",
    "Answer 4",
  ],
  questionFour: [
    "Question 4",
    "Answer 1",
    "Answer 2",
    "Answer 3",
    "Right Answer",
  ],
};

// Called when Begin button is clicked
function startQuiz() {
  //hide Begin button
  beginButton.setAttribute("style", "display: none;");

  //display answer buttons
  for (let index = 0; index < answerButtons.length; index++) {
    answerButtons[index].setAttribute("style", "display: block;");
  }

  /* should make the next two actions into a function called nextQuestion */

  //add question text
  //   content.textContent = questions.questionOne[0];

  //add answer button text
  for (let index = 0; index < answerText.length; index++) {
    answerText[index].textContent = questions.questionOne[index + 1];
  }
}

//assign rightAnswer and wrongAnswer variables to the correct button
if (content.textContent == questions.questionOne[0]) {
  rightAnswer = answerOne;
  console.log("question one", rightAnswer); //delete
  wrongAnswerOne = answerTwo;
  wrongAnswerTwo = answerThree;
  wrongAnswerThree = answerFour;

  //
} else if ((content.textContent == questions.questionTwo[0])) {
  rightAnswer = answerTwo;
  console.log("question two", rightAnswer); //delete
  wrongAnswerOne = answerOne;
  wrongAnswerTwo = answerThree;
  wrongAnswerThree = answerFour;
} else if ((content.textContent == questions.questionThree[0])) {
  rightAnswer = answerThree;
  console.log("question three", rightAnswer); //delete
  wrongAnswerOne = answerOne;
  wrongAnswerTwo = answerTwo;
  wrongAnswerThree = answerFour;
} else {
  rightAnswer = answerFour;
  console.log("question four", rightAnswer); //delete
  wrongAnswerOne = answerOne;
  wrongAnswerTwo = answerTwo;
  wrongAnswerThree = answerThree;
}

rightAnswer.addEventListener("click", function () {
  console.log("That's the right answer!"); //delete
  //call nextQuestion
  nextQuestion();
});

wrongAnswerOne.addEventListener("click", function () {
  console.log("That's the wrong answer!"); //delete
  //call minusTen
});

wrongAnswerTwo.addEventListener("click", function () {
  console.log("That's the wrong answer!"); //delete
});

wrongAnswerThree.addEventListener("click", function () {
  console.log("That's the wrong answer!"); //delete
});

// Call checkAnswer when any of the answer buttons are clicked
// answerOne.addEventListener("click", checkAnswer);

// answerTwo.addEventListener("click", checkAnswer);
// answerThree.addEventListener("click", checkAnswer);
// answerFour.addEventListener("click", checkAnswer);

// Call startQuiz when Begin button is clicked
beginButton.addEventListener("click", startQuiz);


/// let's try this for a minute
function nextQuestion() {
  var questionArray = [
    questions.questionOne[0],
    questions.questionTwo[0],
    questions.questionThree[0],
    questions.questionFour[0],
  ];

  content.textContent = questionArray[currentQuestion];

  currentQuestion++;
  // content.textContent = questions.questionTwo[0];

  //add answer button text
  for (let index = 0; index < answerText.length; index++) {
    answerText[index].textContent = questions.questionTwo[index + 1];
  }
}

