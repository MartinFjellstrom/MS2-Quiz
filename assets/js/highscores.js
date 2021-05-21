const highScoresList = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const questionsRadio = document.getElementsByClassName("questions-check");
const difficultyRadio = document.getElementsByClassName("difficulty-check");
const categoryOptions = document.getElementsByClassName("setting-category-option");
const highScoreListContainer = document.getElementById("high-scores-list-container");
const highScoreSettingContainer = document.getElementById("highscore-settings");
const checkNewHS = document.getElementById("check-new-hs-btn");

function findHighscore(e) {
    e.preventDefault();
    if (window.innerWidth <= 460){
        highScoreListContainer.classList.add("high-scores-list-popup")
        highScoreSettingContainer.style.display = "none";
        checkNewHS.style.display = "block";
    }
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

function checkNewHighSore(){
    highScoreListContainer.classList.remove("high-scores-list-popup")
        highScoreSettingContainer.style.display = "flex";
        checkNewHS.style.display = "none";
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