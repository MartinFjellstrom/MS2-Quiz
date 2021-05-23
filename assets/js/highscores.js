// Some of the code on this page is borrowed from a quiz tutorial that is linked in the README.md file

// Variable to target the high score list
const highScoresList = document.getElementById("high-scores-list");
// Variable to get the high score object that is saves in the local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// Variable to target the amount of questions radio buttons
const questionsRadio = document.getElementsByClassName("questions-check");
// Variable to target the difficulty radio buttons
const difficultyRadio = document.getElementsByClassName("difficulty-check");
// Variable to target the category drop down
const categoryOptions = document.getElementsByClassName("setting-category-option");
// Variable to target the high scores list container
const highScoreListContainer = document.getElementById("high-scores-list-container");
// Variable to target the high scores settings container
const highScoreSettingContainer = document.getElementById("highscore-settings");
// Variable to target the check new high score button 
const checkNewHS = document.getElementById("check-new-hs-btn");

// Function to find,sort and print the scores saved in the local storage
function findHighscore(e) {
    e.preventDefault();
    if (window.innerWidth <= 460) {
        highScoreListContainer.classList.add("high-scores-list-popup");
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
        }
    }
    highScoresList.innerHTML = displayedHighscore
        .map(function (newScore) {
            return `<li class="high-score">${newScore.name} - ${newScore.score}</li>`;
        })
        .join("");
}

// Function to toggle between the high scores filter and list
function checkNewHighSore() {
    highScoreListContainer.classList.remove("high-scores-list-popup");
    highScoreSettingContainer.style.display = "flex";
    checkNewHS.style.display = "none";
}

// Functions to determine which setting are picked in the high score filter
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