
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restartBtn');
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(e) {
  const cell = e.target;
  if (cell.textContent !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
statusText.textContent = `Player ${currentPlayer}'s turn`;
