// Select DOM elements
const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const winnerText = document.getElementById('winner');
const restartButton = document.getElementById('restart-button');

let isCircleTurn = false; // Track player turn

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Start or reset the game
function startGame() {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('circle', 'cross', 'taken');
        cell.textContent = ''; // Clear X or O from the cell
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnerMessage.classList.add('hidden');
    restartButton.classList.add('hidden');
}

// Handle a cell click
function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'cross';
    const currentMark = isCircleTurn ? 'O' : 'X';

    placeMark(cell, currentClass, currentMark);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

// Place a mark and update the cell text
function placeMark(cell, currentClass, currentMark) {
    cell.classList.add(currentClass, 'taken');
    cell.textContent = currentMark; // Display X or O
}

// Swap player turns
function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

// Check for a win
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

// Check for a draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('circle') || cell.classList.contains('cross');
    });
}

// End the game
function endGame(draw) {
    if (draw) {
        winnerText.innerText = 'It\'s a Draw!';
    } else {
        winnerText.innerText = isCircleTurn ? 'O' : 'X';
    }
    winnerMessage.classList.remove('hidden');
    restartButton.classList.remove('hidden');
}

// Add restart functionality
restartButton.addEventListener('click', startGame);

// Start the game on load
startGame();
