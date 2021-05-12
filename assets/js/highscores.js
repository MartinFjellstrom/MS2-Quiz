const highScoresList = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML =
    highScores.map(function (newScore) {
        return `<li class="high-score">${newScore.name} - ${newScore.score}</li>`
    }).join("");