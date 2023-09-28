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
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
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
    if (scores[activePlayer] >= 20) {
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

// ------------------------ EN - PT --------------------------
const currentTitle = document.querySelectorAll('.current-title');
const enEl = document.getElementById('en');
const ptEl = document.getElementById('pt');

enEl.addEventListener('click', () => {
  enEl.classList.add('active');
  ptEl.classList.remove('active');
  btnNewGame.textContent = '🔄 new game';
  btnHold.textContent = '📥Hold';
  btnRoll.textContent = '🎲roll dice';
  player0El.children[0].textContent = 'PLAYER 1';
  player1El.children[0].textContent = 'PLAYER 2';
  for (let i = 0; i < currentTitle.length; i++) {
    currentTitle[i].textContent = 'CURRENT';
  }
  // MODAL
  modal.children[0].innerHTML = 'How to <span class="lightgreen">play</span> this game ?';
  modal.children[1].innerHTML = `<span class="darkGray">1</span>- Click <span class="darkRed">ROLL DICE</span> to get 2 to 6
  points, these points will be store into your <span class="lightGray">Current Score</span>.`;
  modal.children[2].innerHTML = `<span class="darkGray">2</span>- Use <span class="darkBlue">HOLD</span> to save all your
  current points into your global score.`;
  modal.children[3].innerHTML = `<span class="darkGray">3</span>- If you hold your points or
  <span class="red">get</span> a<span class="red"> 1</span> then it's other player's round to
  roll the dice.`;
  modal.children[4].innerHTML = `<span class="darkGray">4</span>- First player to reach
  <span class="darkBlue">100</span> points <span class="yellow">win the game</span>!`;
});

ptEl.addEventListener('click', () => {
  modal.style.height = 'auto';
  enEl.classList.remove('active');
  ptEl.classList.add('active');
  btnNewGame.textContent = '🔄 Novo Jogo';
  btnHold.textContent = '📥Segurar';
  btnRoll.textContent = '🎲Jogar dado';
  player0El.children[0].textContent = 'JOGADOR 1';
  player1El.children[0].textContent = 'JOGADOR 2';
  for (let i = 0; i < currentTitle.length; i++) {
    currentTitle[i].textContent = 'ATUAL';
  }
  // MODAL
  modal.children[0].innerHTML = 'Como <span class="lightgreen">jogar</span> esse jogo ?';
  modal.children[1].innerHTML = `<span class="darkGray">1</span>- Clique <span class="darkRed">JOGAR DADO</span> para receber de 2 a 6 pontos, esses pontos serão armazenados em sua <span class="lightGray">Pontuação Atual</span>.`;
  modal.children[2].innerHTML = `<span class="darkGray">2</span>- Use <span class="darkBlue">SEGURAR</span> para salvar todos os seus pontos dentro de sua pontuação global.`;
  modal.children[3].innerHTML = `<span class="darkGray">3</span>- Caso você segure seus pontos ou 
  <span class="red">receba</span> o dado de valor<span class="red"> 1</span>, a vez de jogar passa para o outro jogador.`;
  modal.children[4].innerHTML = `<span class="darkGray">4</span>- Primeiro jogador a coletar
  <span class="darkBlue">100</span> pontos <span class="yellow">ganha o jogo</span>!`;
});
