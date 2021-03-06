"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const name0El = document.querySelector("#name--0");
const name1El = document.querySelector("#name--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1El.textContent = 0;
  name0El.textContent = "Player 1";
  name1El.textContent = "Player 2";

  diceEl.classList.add("hidden");
  player1El.classList.remove("player--winner");
  player0El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `starter/dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 50
    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      document.querySelector(`#name--${activePlayer}`).textContent =
        "Winner!! 🥇";
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

const modalBtn = document.querySelector(".btn--how");
const modalOverlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

modalBtn.addEventListener("click", function () {
  modalOverlay.classList.add("overlay-active");
});

const closeModal = function () {
  modalOverlay.classList.remove("overlay-active");
};

btnCloseModal.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape" && modalOverlay.classList.contains("overlay-active")) {
    closeModal();
  }
});
