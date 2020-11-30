/* global document */
/* global localStorage */
/* global window */
/* global Audio */
/* eslint no-use-before-define: ["error", { "functions": false }] */

const playingField = document.createElement('div');
playingField.className = 'playing-field';
const field = document.createElement('div');
field.className = 'field';
const header = document.createElement('header');
const footer = document.createElement('footer');
const instruction = document.createElement('h3');
instruction.innerText = 'Empty cell should be at position top: 0 and left: 0 in the end of the game';

document.body.append(instruction);
document.body.append(playingField);
playingField.appendChild(header);
playingField.appendChild(field);
playingField.appendChild(footer);

const buttonPlayElement = document.createElement('button');
footer.appendChild(buttonPlayElement);

const buttonSoundElement = document.createElement('button');
buttonSoundElement.innerHTML = "<img src='assets/icons/volume_up.svg' width='25px' height='25px'>";
header.appendChild(buttonSoundElement);

const buttonSaveElement = document.createElement('button');
buttonSaveElement.innerText = 'Save Game';
header.appendChild(buttonSaveElement);

const moveElement = document.createElement('span');
moveElement.innerText = 'Moves: 0';
footer.appendChild(moveElement);

const timeElement = document.createElement('span');
timeElement.innerText = 'Time: 00:00';
footer.appendChild(timeElement);

const messageElement = document.createElement('h2');
document.body.append(messageElement);

const cellSize = 25;

let cells = [];

let empty = {
  value: 0,
  top: 0,
  left: 0,
};

let move = 0;
let hasSound = true;
let min = 0;
let sec = 0;
let startedDate = new Date().getTime();
let timer = setInterval(countTime, 1000);

function createNewGame() {
  resetGame();
  buttonPlayElement.textContent = 'Reset';

  const numbers = getRandomNumbers();

  cells.push(empty);

  for (let i = 1; i <= 15; i += 1) {
    const value = numbers[i - 1];
    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
      value,
      left,
      top,
    });
  }
  renderCells(cells);
}

function getRandomNumbers() {
  let sum = 0;
  let numbers = [];

  while (sum % 2 !== 0 || sum === 0) {
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(
      () => Math.random() - 0.5,
    );

    for (let i = 0; i < 15; i += 1) {
      let j = i + 1;
      while (j < 15) {
        if (numbers[j] < numbers[i]) {
          sum += 1;
        }
        j += 1;
      }
    }
  }
  return numbers;
}

function renderCells() {
  cells.forEach((cell, i) => {
    if (cell.value !== 0) {
      const cellElement = document.createElement('div');
      cellElement.className = 'cell';
      cellElement.innerHTML = cell.value;
      cellElement.id = cell.value;
      cellElement.style.left = `${cell.left * cellSize}%`;
      cellElement.style.top = `${cell.top * cellSize}%`;
      field.append(cellElement);
      cellElement.addEventListener('click', () => {
        if (buttonPlayElement.textContent !== 'New Game') {
          moveCell(i);
        }
      });
    }
  });
}

function moveCell(index) {
  const movingCell = cells[index];

  const emptyCell = cells.find((cell) => cell.value === 0);

  const leftDiff = Math.abs(emptyCell.left - movingCell.left);
  const topDiff = Math.abs(emptyCell.top - movingCell.top);

  if (leftDiff + topDiff > 1) {
    return;
  }

  document.getElementById(movingCell.value).style.left = `${emptyCell.left * cellSize
  }%`;
  document.getElementById(movingCell.value).style.top = `${emptyCell.top * cellSize
  }%`;

  const emptyLeft = emptyCell.left;
  const emptyTop = emptyCell.top;
  emptyCell.left = movingCell.left;
  emptyCell.top = movingCell.top;
  movingCell.left = emptyLeft;
  movingCell.top = emptyTop;

  moveElement.textContent = `Moves: ${(move += 1)}`;
  playSound('click');

  const isFinished = cells.every(
    (cell) => cell.value === cell.top * 4 + cell.left,
  );

  if (isFinished) {
    messageElement.textContent = `Good job! You solved the puzzle in ${min} min ${sec} sec and ${move} moves.`;
    playSound('winner');
    move = 0;
    moveElement.textContent = 'Moves: 0';
    clearInterval(timer);
    timeElement.textContent = 'Time: 00:00';
    buttonPlayElement.textContent = 'New Game';
  } else {
    messageElement.textContent = '';
  }
}

function resetGame() {
  startedDate = new Date().getTime();
  field.innerHTML = '';
  empty = {
    value: 0,
    top: 0,
    left: 0,
  };
  cells = [];
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function countTime() {
  const currentDate = new Date().getTime();
  const diffSec = Math.round((currentDate - startedDate) / 1000);
  min = Math.trunc(diffSec / 60);
  sec = diffSec % 60;
  timeElement.textContent = `Time: ${addZero(min)}:${addZero(sec)}`;
  return timeElement.textContent;
}

function playSound(name) {
  if (hasSound === false) return;

  const audio = new Audio();

  audio.src = `assets/sounds/${name}.mp3`;
  audio.play();
}

function saveGame() {
  localStorage.setItem('cells', JSON.stringify(cells));
  localStorage.setItem('moves', move);
  localStorage.setItem('min', min);
  localStorage.setItem('sec', sec);
}

function loadSavedGame() {
  buttonPlayElement.textContent = 'Reset';
  field.innerHTML = '';
  cells = JSON.parse(localStorage.getItem('cells'));
  move = Number(localStorage.getItem('moves'));
  min = Number(localStorage.getItem('min'));
  sec = Number(localStorage.getItem('sec'));
  startedDate = new Date().getTime() - (min * 60 + sec) * 1000;
  moveElement.textContent = `Moves: ${move}`;
  timeElement.textContent = `Time: ${addZero(min)}:${addZero(sec)}`;
  renderCells(cells);
}

buttonSaveElement.addEventListener('click', () => {
  saveGame();
});

buttonPlayElement.addEventListener('click', () => {
  move = 0;
  moveElement.textContent = 'Moves: 0';
  timeElement.textContent = 'Time: 00:00';
  if (buttonPlayElement.textContent === 'New Game') {
    messageElement.textContent = '';
    timer = setInterval(countTime, 1000);
  }
  return createNewGame();
});

buttonSoundElement.addEventListener('click', () => {
  if (hasSound) {
    hasSound = false;
    buttonSoundElement.innerHTML = "<img src='assets/icons/volume_off.svg' width='25px' height='25px'>";
  } else {
    hasSound = true;
    buttonSoundElement.innerHTML = "<img src='assets/icons/volume_up.svg' width='25px' height='25px'>";
  }
});

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('cells')) {
    createNewGame();
  } else {
    loadSavedGame();
  }
});
