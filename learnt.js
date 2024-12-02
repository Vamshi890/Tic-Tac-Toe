const board = document.getElementById("game-board");
const messageContainer = document.getElementById("message-container");
const message = document.getElementById("message");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function createCell(index) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = index;
  cell.addEventListener("click", handleCellClick);
  return cell;
}

function renderBoard() {
  board.innerHTML = "";
  gameBoard.forEach((value, index) => {
    const cell = createCell(index);
    cell.textContent = value;
    board.appendChild(cell);
  });
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (gameBoard[index] === "" && !checkWinner()) {
    gameBoard[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
      message.textContent = `Player ${currentPlayer} wins!`;
    }
    else if (!gameBoard.includes("")) {
      message.textContent = "It's a draw!";

    } 
    else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }

  return false;
}

function showNewGameButton() {
  const button = document.createElement("button");
  button.textContent = "New Game";
  button.onclick = newGame;
  messageContainer.appendChild(button);
  
}

function newGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  renderBoard();
  message.textContent = `Player ${currentPlayer}'s turn`;
  handleCellClick();
  messageContainer.innerHTML = "";
}

renderBoard();
message.textContent = `Player ${currentPlayer}'s turn`;



