const playingField = document.createElement("div");
playingField.className = "playing-field";

const field = document.createElement("div");
field.className = "field";
const header = document.createElement("header");
const footer = document.createElement("footer");
const instruction = document.createElement("h3");
instruction.innerText =
  "Empty cell should be at position top: 0 and left: 0 in the end of the game";

document.body.append(instruction);
document.body.append(playingField);
playingField.appendChild(header);
playingField.appendChild(field);
playingField.appendChild(footer);

const buttonPlayElement = document.createElement("button");
footer.appendChild(buttonPlayElement);

const buttonSoundElement = document.createElement("button");
buttonSoundElement.innerHTML =
  "<img src='assets/icons/volume_up.svg' width='25px' height='25px'>";
header.appendChild(buttonSoundElement);

const buttonSaveElement = document.createElement("button");
buttonSaveElement.innerText = "Save Game";
header.appendChild(buttonSaveElement);

const moveElement = document.createElement("span");
moveElement.innerText = "Moves: 0";
footer.appendChild(moveElement);

const timeElement = document.createElement("span");
timeElement.innerText = "Time: 00:00";
footer.appendChild(timeElement);

const messageElement = document.createElement("h2");
document.body.append(messageElement);

const cellSize = 25;

let cells = [];

let empty = {
  value: 0,
  top: 0,
  left: 0,
};

let move = 0;
let timeСounter = 0;
let sound = true;
let startedDate;

function createNewGame() {
  resetGame();
  buttonPlayElement.textContent = "Reset";
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(
    () => Math.random() - 0.5
  );

  let sum = 0;

  for (let i = 0; i < 15; i++) {
    let j = i + 1;
    while (j < 15) {
      if (numbers[j] < numbers[i]) {
        sum += 1;
      }
      j++;
    }
  }

  if (sum % 2 !== 0) {
    return createNewGame();
  }

  cells.push(empty);

  for (let i = 1; i <= 15; i++) {
    const cell = document.createElement("div");
    const value = numbers[i - 1];

    cell.className = "cell";
    cell.innerHTML = value;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
      value: value,
      left: left,
      top: top,
      element: cell,
    });

    cell.style.left = `${left * cellSize}%`;
    cell.style.top = `${top * cellSize}%`;

    field.append(cell);

    cell.addEventListener("click", () => {
      if (buttonPlayElement.textContent !== "New Game") {
        moveCell(i);
      }
    });
  }
}

function moveCell(index) {
  const cell = cells[index];

  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);

  if (leftDiff + topDiff > 1) {
    return;
  }

  cell.element.style.left = `${empty.left * cellSize}%`;
  cell.element.style.top = `${empty.top * cellSize}%`;

  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  empty.left = cell.left;
  empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  moveElement.textContent = `Moves: ${(move += 1)}`;
  playSound("click");

  const isFinished = cells.every((cell) => {
    return cell.value === cell.top * 4 + cell.left;
  });

  if (isFinished) {
    messageElement.textContent = `Good job! You solved the puzzle in ${min} min ${sec} sec and ${move} moves.`;
    playSound("winner");
    move = 0;
    moveElement.textContent = `Moves: 0`;
    clearInterval(timer);
    time = 0;
    timeElement.textContent = `Time: 00:00`;
    buttonPlayElement.textContent = "New Game";
  } else {
    messageElement.textContent = "";
  }
}

function resetGame() {
  startedDate = new Date().getTime();
  field.innerHTML = "";
  empty = {
    value: 0,
    top: 0,
    left: 0,
  };
  cells = [];
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

let min;
let sec;

function countTime() {
  const currentDate = new Date().getTime();
  const diffSec = Math.round((currentDate - startedDate) / 1000);

  min = Math.trunc(diffSec / 60);
  sec = diffSec % 60;

  return (timeElement.textContent = `Time: ${addZero(min)}:${addZero(sec)}`);
}

let timer = setInterval(countTime, 1000);

function playSound(name) {
  if (sound === false) return;

  const audio = new Audio();

  audio.src = `assets/sounds/${name}.mp3`;
  audio.play();
}

function saveGame() {
  localStorage.setItem("field", field.innerHTML);
  localStorage.setItem("moves", move);
  localStorage.setItem("min", min);
  localStorage.setItem("sec", sec);
}

function getSaveGame() {
  localStorage.getItem("field", field.innerHTML);
  let saveMoves = localStorage.getItem("moves", move);
  moveElement.textContent = `Move: ${saveMoves}`;
  min = localStorage.getItem("min", min);
  sec = localStorage.getItem("sec", sec);
  timeElement.textContent = `Time: ${addZero(min)}:${addZero(sec)}`;
}

buttonSaveElement.addEventListener("click", () => {
  saveGame();
});

buttonPlayElement.addEventListener("click", () => {
  move = 0;
  moveElement.textContent = `Moves: 0`;
  time = 0;
  timeElement.textContent = `Time: 00:00`;
  if (buttonPlayElement.textContent === "New Game") {
    messageElement.textContent = "";
    timer = setInterval(countTime, 1000);
  }
  return createNewGame();
});

buttonSoundElement.addEventListener("click", () => {
  if (sound) {
    sound = false;
    buttonSoundElement.innerHTML =
      "<img src='assets/icons/volume_off.svg' width='25px' height='25px'>";
  } else {
    sound = true;
    buttonSoundElement.innerHTML =
      "<img src='assets/icons/volume_up.svg' width='25px' height='25px'>";
  }
});

window.addEventListener("DOMContentLoaded", function () {
  // if (localStorage.length === 0) {
  createNewGame();
  // } else {
  //   getSaveGame();
  // }
});
