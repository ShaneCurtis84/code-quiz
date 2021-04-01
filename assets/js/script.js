// Timer

var timer = 0;
var timeLeft = 75;

// Landing Page

var mainPageEl = document.querySelector("main");
var headerEl = document.getElementById("header");
var landPageEl = document.querySelector(".landing-page");
var timeEl = document.querySelector("span");
var quizStartBtnEl = document.querySelector("#start-quiz");
var highScoreButtonEl = document.querySelector("#show-score");

//Quiz Page

var i,
  quizPageEl = document.querySelector(".quiz-page");
(answersEl = document.getElementById("answers")),
  (questionHeadEl = document.getElementById("question")),
  (result = document.getElementById("result")),

  
// Game Over Page

  (gameOverEL = document.querySelector(".game-over"));
gameOverScoreEl = document.getElementById("score");

var enterInitialEl = document.createElement("div");
enterInitialEl.className = "enter-initial";

var submitButtonEl = document.createElement("button");
submitButtonEl.className = "button-submit";
submitButtonEl.textContent = "Submit";

// High Score Page

var highScoreEl = document.querySelector(".high-score");
var highScoreButtonsEl = document.createElement("div");
highScoreButtonsEl.className = "high-score-buttons";
var highScoreListEl = document.createElement("ul");
highScoreListEl.className = "high-scores";

//Multi choice questions in Array

var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: 2,
  },

  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: 2,
  },

  {
    question: "Arrays in Javascript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: 3,
  },

  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: 2,
  },

  {
    question:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: 3,
  },
];

var quizTimer = function () {
  //Remove landing page content

  mainPageEl.removeChild(landPageEl);

  //Set countdown on timer

  timer = setInterval(function () {
    timeEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft === 0) {
      clearInterval(timer);
      timeEl.textContent = "0";
      gameOver();
    }
  }, 1000);

  //Call the quiz start function to begin

  startQuiz(questions.shift());
};

function startQuiz(q) {
  // display questions
  questionHeadEl.innerHTML = q.question;

  // remove any existing buttons from the element
  answersEl.innerHTML = "";

  // Create a button for each choice
  for (i = 0; i < q.choices.length; i++) {
    btn = document.createElement("button");
    btn.className = "answer-buttons";
    btn.innerHTML = q.choices[i];
    btn.setAttribute("id", i);

    // Click function for button
    btn.onclick = function () {
      var id = parseInt(this.getAttribute("id"));

      // If answer is correct/ . Display Correct

      if (id === q.answer) {
        result.textContent = "Correct!";
      }

      // If answer is incorrect display incorrect and remove 10 secs from the timer

      if (id !== q.answer) {
        result.textContent = "Incorrect!";
        timeLeft -= 10;
      }

      // Run through all questions in the array. Othewise stop the timer and start the gameover page.

      if (questions.length) {
        startQuiz(questions.shift());
      } else {
        clearInterval(timer);
        timeEl.textContent = "0";

        gameOver();
      }
    };

    // Append the buttons to the page.
    answersEl.appendChild(btn);
  }
}

var gameOver = function () {
  //Remove Quiz Page
  mainPageEl.removeChild(quizPageEl);

  // Display Game over page and final score.
  finish.textContent = "All Done!";
  score.textContent = "Your final score is " + timeLeft + ".";
  // Enter initials Form
  enterInitialEl.innerHTML =
    "<label for='initials'>Enter intials: </label><input type='text' name='initials' minlength='2' maxlength='2' >";

  //Append Form

  gameOverEL.appendChild(enterInitialEl);
  enterInitialEl.appendChild(submitButtonEl);
};

var inputScores = function () {
  // Save initals
  var initialsInput = document.querySelector("input").value;

  // if no initials entered, try again
  if (!initialsInput || initialsInput.length < 2) {
    alert("Initials cannot be left blank");
    return;
  }

  // Object for final score
  var highScoreObj = {
    name: initialsInput,
    score: timeLeft,
  };

  // pull any already existing high scores from localStorage
  var dataFromLocal = JSON.parse(localStorage.getItem("highScores"));

  // if nothing, start empty array. If previous scores add to array.
  if (!dataFromLocal) {
    dataFromLocal = [];
  }

  dataFromLocal.push(highScoreObj);

  // save new high score array to local storage
  localStorage.setItem("highScores", JSON.stringify(dataFromLocal));

  // remove element and view high scores
  mainPageEl.removeChild(gameOverEL);

  HighScoresPage();
};

var highScoreButtons = function (event) {
  var buttonClicked = event.target;

  // if go back button was clicked
  if (buttonClicked.textContent === "Go back") {
    window.location.href = window.location.href;
    return;
  }
  // if clear high scores button was pushed
  else {
    // remove high scores
    localStorage.removeItem("highScores");

    // Remove elment
    highScoreEl.removeChild(highScoreListEl);
  }
};

var HighScoresPage = function () {
  // remove header
  headerEl.remove();
  landPageEl.remove();
  quizPageEl.remove();
  gameOverEL.remove();

  highscores.textContent = "High Scores";

  // Back to start of quiz button
  var goBackButtonEl = document.createElement("button");
  goBackButtonEl.className = "go-back-button";
  goBackButtonEl.textContent = "Go back";

  // clear scores button
  var clearHighScoresBtnEl = document.createElement("button");
  clearHighScoresBtnEl.className = "clear-high-button";
  clearHighScoresBtnEl.textContent = "Clear High Scores";

  //Get scores from localStorage
  var getScores = localStorage.getItem("highScores");
  getScores = JSON.parse(getScores);

  for (var i = 0; i < getScores.length; i++) {
    var scoresListItem = document.createElement("li");
    scoresListItem.textContent =
      [i + 1] + ". " + getScores[i].name + " - " + getScores[i].score;
    highScoreListEl.appendChild(scoresListItem);
  }

  // append List elements and buttons

  highScoreEl.appendChild(highScoreListEl);
  highScoreEl.appendChild(highScoreButtonsEl);
  highScoreButtonsEl.appendChild(goBackButtonEl);
  highScoreButtonsEl.appendChild(clearHighScoresBtnEl);
};

// Event listeners

quizStartBtnEl.addEventListener("click", quizTimer);
submitButtonEl.addEventListener("click", inputScores);
highScoreButtonsEl.addEventListener("click", highScoreButtons);
highScoreButtonEl.addEventListener("click", HighScoresPage);
