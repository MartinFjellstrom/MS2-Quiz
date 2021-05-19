const highScoresList = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const questionsRadio = document.getElementsByClassName("questions-check");
const difficultyRadio = document.getElementsByClassName("difficulty-check");
const categoryOptions = document.getElementsByClassName("setting-category-option");

function findHighscore(e) {
    e.preventDefault();
    checkQuestionsValue();
    checkDifficultyValue();
    checkCategoryValue();

    const displayedHighscore = [];

    for (let i = 0; i < highScores.length; i++) {
        if (highScores[i].maxQuestions == checkQuestionsValue() &&
            highScores[i].difficulty == checkDifficultyValue() &&
            highScores[i].category == checkCategoryValue()) {
            displayedHighscore.push(highScores[i]);
            displayedHighscore.sort(function (a, b) {
                return b.score - a.score;
            });
            displayedHighscore.splice(5);
        };
    }
    highScoresList.innerHTML = displayedHighscore
        .map(function (newScore) {
            return `<li class="high-score">${newScore.name} - ${newScore.score}</li>`;
        })
        .join("");
}

function checkQuestionsValue() {
    for (let i = 0; i < questionsRadio.length; i++) {
        if (questionsRadio[i].checked) {
            return questionsRadio[i].value;
        }
    }
}

function checkDifficultyValue() {
    for (let i = 0; i < difficultyRadio.length; i++) {
        if (difficultyRadio[i].checked) {
            return difficultyRadio[i].value;
        }
    }
}

function checkCategoryValue() {
    for (let i = 0; i < categoryOptions.length; i++) {
        if (categoryOptions[i].selected) {
            return categoryOptions[i].value;
        }
    }
}