const playingField = document.createElement("div");
playingField.className = "playing-field";

const field = document.createElement("div");
field.className = "field";
const header = document.createElement("header");
const footer = document.createElement("footer");

document.body.append(playingField);
playingField.appendChild(header);
playingField.appendChild(field);
playingField.appendChild(footer);

const buttonPlayElement = document.createElement("button");
buttonPlayElement.innerText = "Play";
header.appendChild(buttonPlayElement);

const buttonSoundElement = document.createElement("button");
buttonSoundElement.innerHTML = "<img src='assets/icons/volume_up.svg' width='25px' height='25px'>";
header.appendChild(buttonSoundElement);

const moveElement = document.createElement("span");
moveElement.innerText = "Moves: 0";
footer.appendChild(moveElement);

const timeElement = document.createElement("span");
timeElement.innerText = "Time: 00:00";
footer.appendChild(timeElement);

const messageElement = document.createElement("h2");
document.body.append(messageElement);

let cellSize = 25;

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


function newGame() {
  startedDate = new Date().getTime();
  field.innerHTML = "";
  empty = {
    value: 0,
    top: 0,
    left: 0,
  };
  cells = [];
  cells.push(empty);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(
    () => Math.random() - 0.5
  );

  //check isSolvable
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
      console.log('повтор');
      return newGame();
  } 

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
      moveCell(i);
      
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
  playSound();

  const isFinished = cells.every((cell) => {
    return cell.value === cell.top * 4 + cell.left;
  });

  if (isFinished) {
    messageElement.textContent = `Good job! You solved the puzzle in ${min}min ${sec}sec and ${move} moves.`;
    move = 0;
    moveElement.textContent = `Moves: 0`;
    clearInterval(timer);
    time = 0;
    timeElement.textContent = `Time: 00:00`;
  } else {
    messageElement.textContent = "";
  }
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
  
  return timeElement.textContent = `Time: ${addZero(min)}:${addZero(sec)}`;
}

let timer = setInterval(countTime, 1000);


buttonPlayElement.addEventListener("click", () => {
  move = 0;
  moveElement.textContent = `Moves: 0`;
  time = 0;
  timeElement.textContent = `Time: 00:00`;
  return newGame();
});

buttonSoundElement.addEventListener('click', () => {
  if (sound) {
    sound = false;
    buttonSoundElement.innerHTML = "<img src='assets/icons/volume_off.svg' width='25px' height='25px'>";
  } else  {
    sound = true;
    buttonSoundElement.innerHTML = "<img src='assets/icons/volume_up.svg' width='25px' height='25px'>";
  };
});

function playSound() {
  if (sound === false) return;

  const audio = new Audio;

  audio.src = `assets/sounds/click.mp3`;
  audio.play();
}

window.addEventListener("DOMContentLoaded", function () {
  newGame();
});
