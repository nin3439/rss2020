const playingField = document.createElement('div');
playingField.className = 'playing-field';
const title = document.createElement('h1');
title.className = 'title';
title.innerHTML = 'Gem-puzzle';
const field = document.createElement('div');
field.className = 'field';

document.body.append(playingField);
playingField.append(title);
playingField.append(field);

const CELL_SIZE = 100;

const empty = {
    value: 0,
    top: 0,
    left: 0
};

const cells = [];
cells.push(empty);

const numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);
for (let i = 1; i <= 15; i++) {
    const cell = document.createElement('div');
    const value = numbers[i - 1] + 1;
    cell.className = 'cell';
    cell.innerHTML = value;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    });

    cell.style.left = `${left * CELL_SIZE}px`;
    cell.style.top = `${top * CELL_SIZE}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
       moveCell(i);
    });
};

function moveCell(index) {
    const cell = cells[index];
  
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    } 

    cell.element.style.left = `${empty.left * CELL_SIZE}px`;
    cell.element.style.top = `${empty.top * CELL_SIZE}px`;
  
    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    const isFinished = cells.every(cell => {
        return cell.value === cell.top * 4 + cell.left;
    });

    if (isFinished) {
        alert('You won!');
    }
};
