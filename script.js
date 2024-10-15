const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.getElementById('restartButton');
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    updateStatusText();  // Update the initial status text with color
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Apply color styles based on the current player
    if (currentPlayer === "X") {
        cell.style.color = "blue";  // Set X color to blue
    } else {
        cell.style.color = "red";   // Set O color to red
    }
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    updateStatusText();  // Update the status text with the new player's color
}

function updateStatusText() {
    // Change the status text content and color based on the current player
    statusText.textContent = `${currentPlayer}'s turn`;
    if (currentPlayer === "X") {
        statusText.style.color = "blue";  // Status text blue for X
    } else {
        statusText.style.color = "red";   // Status text red for O
    }
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        statusText.style.color = "green";  // Winning message in green
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        statusText.style.color = "black";  // Draw message in black
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = ""; // Reset cell color
    });
    updateStatusText();  // Reset the status text with the first player (X)
    running = true;
}
