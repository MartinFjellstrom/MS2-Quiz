//Variable for the username input text field
const username = document.getElementById("username");
//Variable for the save button
const saveScoreBtn = document.getElementById("save-score-btn");
//Variable for the final score
const finalScore = document.getElementById("final-score");
//Variable to get the most recent score achieved by the user
const mostRecentScore = localStorage.getItem("mostRecentScore");
//Variable to get the high scores from the local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Changing the the global variables to conform with the game settings
maxQuestions = localStorage.getItem("maxQuestions");
difficulty = localStorage.getItem("difficulty");
category = localStorage.getItem("category");
//Updates the final score to mest recent score achieved by the user
finalScore.innerText = mostRecentScore;
//Function to prevent the user from saving a score without any value
username.addEventListener("keyup", function () {
    saveScoreBtn.disabled = !username.value;
});
//Saves the high score to the local storage
function saveHighScore(e) {
    e.preventDefault();

    const newScore = {
        score: mostRecentScore,
        name: username.value,
        maxQuestions: maxQuestions,
        difficulty: difficulty,
        category: category
    };
    highScores.push(newScore);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("index.html");
}