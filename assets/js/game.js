// Most of the code in this file is borrowed from a quiz tutorial that is linked in the README.md file.

// Variable for the questions h2 element
const question = document.getElementById("question");
// Variable to get the choice boxes in an array
const choices = Array.from(document.getElementsByClassName("choice-text"));
// Variable to set the question counter in the HUD
const progressText = document.getElementById("progress-text");
// Variable to set the score counter in the HUD
const scoreText = document.getElementById("score");
// Variable to target the progress bar filler
const progressBarFull = document.getElementById("progress-bar-full");
// Variable target the loader
const loader = document.getElementById("loader");
// Variable to target the game div
const game = document.getElementById("game");

// Variable to set the score given for each question
const correctBonus = 10;

// Variable to handle the displaying question 
let currentQuestion = {};
// Variable to determine if the current question is answered or not
let acceptingAnswers = false;
// Variable to keep track of the users score
let score = 0;
// Variable to keep track of shown questions
let questionCounter = 0;
// Variable to store avalible questions in an array
let availableQuestions = [];
// Variable to store fetched questions from the API
let questions = [];

//Changing the the global variables to conform with the game settings
maxQuestions = localStorage.getItem("maxQuestions");
difficulty = localStorage.getItem("difficulty");
category = localStorage.getItem("category");

// A function to fetch the questions from the API
fetch(`https://opentdb.com/api.php?amount=40&category=${category}&difficulty=${difficulty}&type=multiple`)
    .then(function (res) {
        return res.json();
    })
    .then(function (loadedQuestions) {
        questions = loadedQuestions.results.map(function (loadedQuestion) {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach(function (choice, index) {
                formattedQuestion['choice' + (index + 1)] = choice;
            });
            return formattedQuestion;
        });

        startGame();
    })
    .catch(function (err) {
        console.error(err);
    });

// Function to start the game, get questions and handle the visibility of the game div and the loader
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}

// Function to get new questions and determin if the requsted amount of questions are answered.
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(function (choice) {
        const number = choice.dataset.number;
        choice.innerHTML = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

// Function to determin if the selected answer is corrent or incorrect
choices.forEach(function (choice) {
    choice.addEventListener("click", function (e) {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;
        const correctAnswer = currentQuestion.answer.toString();

        let classToApply = "incorrect";
        if (selectedAnswer === correctAnswer) {
            classToApply = "correct";
        }
        
        if (classToApply === "correct") {
            incrementScore(correctBonus);
        }
        
        if (selectedAnswer !== correctAnswer){
            choices[correctAnswer - 1].parentElement.classList.add("correct");
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(function () {
            selectedChoice.parentElement.classList.remove(classToApply);
            choices[correctAnswer - 1].parentElement.classList.remove("correct");
            getNewQuestion();
        }, 1000);
    });
});

// Function to update the score in the HUD
function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}