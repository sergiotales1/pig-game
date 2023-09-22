/* player-1         /   player-2 */
/* score1           /   score2 */
/* current-score1   /   current-score2 */
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
const score0El = document.querySelector(".score0");
const score1El = document.querySelector(".score1");
const current0El = document.querySelector(".current-score0");
const current1El = document.querySelector(".current-score1");
const btnRoll = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");
const btnNewGame = document.querySelector(".new-game");
const diceEl = document.querySelector(".dice");
let currentScore0 = document.querySelector(".current-score0");
let currentScore1 = document.querySelector(".current-score1");

// starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");
};

init();
const switchPlayers = function () {
  document.querySelector(`.current-score${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

btnRoll.addEventListener("click", () => {
  let diceNumber = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `./assets/dice-${diceNumber}.png`;
  if (diceNumber === 1) {
    switchPlayers();
  } else {
    currentScore += diceNumber;
    document.querySelector(`.current-score${activePlayer}`).textContent =
      currentScore;
  }
});
