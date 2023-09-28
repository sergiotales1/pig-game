const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const score0El = document.querySelector('.score0');
const score1El = document.querySelector('.score1');
const current0El = document.querySelector('.current-score0');
const current1El = document.querySelector('.current-score1');
const btnRoll = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');
const btnNewGame = document.querySelector('.new-game');
const diceEl = document.querySelector('.dice');
let lastDice;

let scores, currentScore, activePlayer, playing;

init();
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  score0El.textContent = 0;
  score1El.textContent = 0;
  btnNewGame.classList.remove('zero-opacity');
  btnHold.classList.remove('zero-opacity');
  btnRoll.classList.remove('zero-opacity');
}
btnRoll.addEventListener('click', () => {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    if (diceNumber === lastDice) {
      diceNumber += 1;
      diceNumber = diceNumber === 7 ? diceNumber - 2 : diceNumber;
    }
    lastDice = diceNumber;
    console.log(diceNumber);
    diceEl.classList.remove('hidden');
    diceEl.src = `./assets/dice-${diceNumber}.png`;
    if (diceNumber === 1) {
      switchPlayers();
    } else {
      currentScore += diceNumber;
      document.querySelector(`.current-score${activePlayer}`).textContent = currentScore;
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score${activePlayer}`).textContent = scores[activePlayer];
    document.querySelector(`.current-score${activePlayer}`).textContent = 0;
    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
      btnNewGame.classList.add('zero-opacity');
      btnHold.classList.add('zero-opacity');
      btnRoll.classList.add('zero-opacity');
      diceEl.classList.add('hidden');
    } else {
      switchPlayers();
    }
  }
});

btnNewGame.addEventListener('click', init);

function switchPlayers() {
  currentScore = 0;
  document.querySelector(`.current-score${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    player0El.classList.add('player-active');
    player1El.classList.remove('player-active');
  } else {
    player1El.classList.add('player-active');
    player0El.classList.remove('player-active');
  }
}

// ------------------------  MODAL --------------------------

const openModalEl = document.getElementById('open-modal');
const closeModalEl = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

openModalEl.addEventListener('click', () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  openModalEl.classList.add('hidden');
});

const updateModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  openModalEl.classList.remove('hidden');
};

overlay.addEventListener('click', updateModal);
closeModalEl.addEventListener('click', updateModal);
