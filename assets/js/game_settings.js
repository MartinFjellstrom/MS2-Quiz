let gameSettings = document.getElementById("game-settings");
let playBtn = document.getElementById("play-btn");
let maxQuestions = 5;
let difficulty = "easy";
let category = 12;

document.addEventListener("mousedown", function () {
    pickDifficulty();
    pickMaxQuestions();
    pickCategory();
});

function pickDifficulty() {
  x = document.getElementById("difficulty").selectedIndex;
  localStorage.setItem("difficulty", document.getElementsByClassName("difficulty-option")[x].value);
}
function pickMaxQuestions() {
  x = document.getElementById("quantity").selectedIndex;
  localStorage.setItem("maxQuestions", document.getElementsByClassName("quantity-option")[x].value);
}
function pickCategory() {
  x = document.getElementById("category").selectedIndex;
  localStorage.setItem("category", document.getElementsByClassName("category-option")[x].value);
}

