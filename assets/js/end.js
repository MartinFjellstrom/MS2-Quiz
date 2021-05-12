const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("save-score-btn");
const finalScore = document.getElementById("final-score");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const maxHighScores = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", function () {
    saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
    e.preventDefault();

    const newScore = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(newScore);
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("index.html");
    console.log(highScores);
};