// Variable to set the amount of questions in a game
let maxQuestions = 5;
// Variable to set the difficulty in a game
let difficulty = "easy";
// Variable to set the category in a game
let category = 12;

// Function to set the selected game settings for a game
function handleSettings(){
    pickDifficulty();
    pickMaxQuestions();
    pickCategory();
}
// Functions to read the selected game settings for a game
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

