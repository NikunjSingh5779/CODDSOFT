const boardEl = document.getElementById("board");
const modal = document.getElementById("modal");
const resultText = document.getElementById("resultText");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const draws = document.getElementById("draws");
const turnDisplay = document.createElement("div");
turnDisplay.style.marginBottom = "10px";
turnDisplay.style.fontWeight = "bold";
document.querySelector(".container").insertBefore(turnDisplay, boardEl);
let board = Array(9).fill("");
let currentPlayer = "X";
let humanPlayer = "X";
let aiPlayer = "O";
const scores = { X: 0, O: 0, D: 0 };
window.onload = () => {
  drawBoard();
};
function drawBoard() {
  boardEl.innerHTML = "";
  board.forEach((cell, i) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.innerText = cell;
    if (cell === "O") div.classList.add("O");
    div.onclick = () => handleMove(i);
    boardEl.appendChild(div);
  });
  turnDisplay.innerText = `${currentPlayer}'s Turn`;
}
function handleMove(index) {
  if (board[index] || checkWinner(board) || currentPlayer !== humanPlayer) return;
  board[index] = humanPlayer;
  drawBoard();
  const winner = checkWinner(board);
  if (winner) return showResult(winner);
  currentPlayer = aiPlayer;
  setTimeout(aiMove, 400);
}
function aiMove() {
  const best = bestAIMove(board, aiPlayer);
  board[best.index] = aiPlayer;
  drawBoard();

  const winner = checkWinner(board);
  if (winner) return showResult(winner);
  currentPlayer = humanPlayer;
}
function bestAIMove(board, player) {
  let best = { score: -Infinity, index: -1 };
  board.forEach((cell, idx) => {
    if (cell === "") {
      const newBoard = [...board];
      newBoard[idx] = player;
      const score = minimax(newBoard, 0, false);
      if (score > best.score) best = { score, index: idx };
    }
  });
  return best;
}
function minimax(b, depth, isMax) {
  const result = checkWinner(b);
  if (result === aiPlayer) return 1;
  if (result === humanPlayer) return -1;
  if (result === "D") return 0;
  const player = isMax ? aiPlayer : humanPlayer;
  let best = isMax ? -Infinity : Infinity;
  b.forEach((cell, idx) => {
    if (!cell) {
      const tempBoard = [...b];
      tempBoard[idx] = player;
      const score = minimax(tempBoard, depth + 1, !isMax);
      best = isMax ? Math.max(score, best) : Math.min(score, best);
    }
  });
  return best;
}
function checkWinner(b) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ];
  for (let [a, b1, c] of wins) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  }
  return b.includes("") ? null : "D";
}
function showResult(winner) {
  resultText.innerText = winner === "D" ? "It's a Draw!" : `${winner} Wins!`;
  scores[winner]++;
  updateScore();
  modal.style.display = "flex";
}
function updateScore() {
  scoreX.innerText = `X: ${scores.X}`;
  scoreO.innerText = `O: ${scores.O}`;
  draws.innerText = `Draws: ${scores.D}`;
}
function resetGame() {
  board = Array(9).fill("");
  currentPlayer = humanPlayer;
  drawBoard();
  modal.style.display = "none";
}
