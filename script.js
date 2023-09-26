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

    const choiceImage = document.createElement("img");
    choiceImage.src = choice + ".png";
    choiceImage.alt = choice;

    while (choiceElement.firstChild) {
        choiceElement.firstChild.remove();
    }
    choiceElement.appendChild(choiceImage);
    choiceElement.classList.add("show");
}

function updateScoreboard() {
    const scoreboardElement = document.getElementById("scoreboard");
    scoreboardElement.innerHTML = `User: ${userWins} | Computer: ${computerWins} | Draws: ${draws}`;
}

function userChoice(ch) {
    choice = ch;

    let user;
    if (choice == 1) {
        user = "rock";
    } else if (choice == 2) {
        user = "paper";
    } else if (choice == 3) {
        user = "scissor";
    } else {
        alert("Please enter a valid input (1-3)");
        return;
    }

    playSound(user);

    let compchoice = Math.floor(Math.random() * 3);
    let ai;
    if (compchoice == 0) {
        ai = "rock";
    } else if (compchoice == 1) {
        ai = "paper";
    } else {
        ai = "scissor";
    }

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

    playSound(resultMessage.includes("won") ? "win" : resultMessage.includes("lost") ? "lose" : "draw");

    const resultElement = document.createElement("div");
    resultElement.classList.add("result-message");
    resultElement.textContent = resultMessage;
    document.body.appendChild(resultElement);

    setTimeout(() => {
        resultElement.remove();
    }, 3000);
}

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
