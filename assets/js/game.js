const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progress-bar-full");

const correctBonus = 10;
const maxQuestions = 3;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
];

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        //Go to the end page
        return window.location.assign("end.html");
    };
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(function (choice) {
        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(function (choice) {
    choice.addEventListener("click", function (e) {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = "incorrect"
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
        };

        if (classToApply === "correct") {
            incrementScore(correctBonus);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(function () {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
};

startGame();