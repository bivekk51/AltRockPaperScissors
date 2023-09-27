// script.js
let userWins = 0;
let computerWins = 0;
let draws = 0;

function playSound(choice) {
    const audio = new Audio(`${choice}.mp3`);
    audio.play();
}

function displayChoice(elementId, choice) {
    const choiceElement = document.getElementById(elementId);

    while (choiceElement.firstChild) {
        choiceElement.firstChild.remove();
    }
 
}

function updateScoreboard() {
    const scoreboardElement = document.getElementById("scoreboard");
    scoreboardElement.innerHTML = `
        <span style="background-color: blue;">User: ${userWins}</span> |
        <span style="background-color: red;">Computer: ${computerWins}</span> |
        <span style="background-color: yellow; color: black;">Draws: ${draws}</span>`;
}

function userChoice(ch) {
    choice = ch;

    const user = choice === 1 ? "rock" : choice === 2 ? "paper" : choice === 3 ? "scissor" : null;

    if (user === null) {
    alert("Please enter a valid input (1-3)");
    return;
}
 

    playSound(user);

    const compchoice = Math.floor(Math.random() * 3);
    const ai = compchoice === 0 ? "rock" : compchoice === 1 ? "paper" : "scissor";


    displayResult(user, ai);
}

function displayResult(user, ai) {
    let resultMessage = "";
    if (ai == user) {
        resultMessage = `It's a draw! You both chose ${user}. Wanna try again? 😊`;
        draws++;
    } else if (
        (ai == "rock" && user == "scissor") ||
        (ai == "scissor" && user == "paper") ||
        (ai == "paper" && user == "rock")
    ) {
        resultMessage = `Your choice: ${user}, Computer's choice: ${ai}. You lost. Better luck next time! 🙁`;
        computerWins++;
    } else {
        resultMessage = `Your choice: ${user}, Computer's choice: ${ai}. Congratulations, you won! 🎉`;
        userWins++;
    }

    updateScoreboard();


    const resultElement = document.createElement("div");
    resultElement.classList.add("result-message");
    resultElement.textContent = resultMessage;
    document.body.appendChild(resultElement);

    setTimeout(() => {
        resultElement.remove();
    }, 3000);
}

// Function to show the game board and hide the "Play Game" button
function showGame() {
    const playButton = document.getElementById("play-button");
    const gameContainer = document.getElementById("game-container");

    playButton.style.display = "none";
    gameContainer.style.display = "block";
}

// Add an event listener to the "Play Game" button
const playButton = document.getElementById("play-button");
playButton.addEventListener("click", showGame);

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);

function resetGame() {
    userWins = 0;
    computerWins = 0;
    draws = 0;
    updateScoreboard();
    const choiceImages = document.querySelectorAll(".choice-image.show");
    choiceImages.forEach((image) => {
        image.classList.remove("show");
    });
}
