const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const decimalBtn = document.getElementById('decimal');
const clearBtns = document.querySelectorAll('.clear-btn')
const resultBtn = document.getElementById('result');
const display = document.getElementById('display');
const sqrtBtn = document.getElementById('sqrt');
const minusBtn = document.getElementById('minus');

let isNegativeNumber = false;
let memoryCurrentNumber = 0;
let memoryPendingOperation = '';
let isWaitNextNumber = false;
let memoryPreviosClick = '';


for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', function(e) {
    numberPress(e.target.textContent)
  });
};

for (let i = 0; i < operations.length; i++) {
  let operationBtn = operations[i];
  operationBtn.addEventListener('click', function(e) {
    operation(e.target.textContent)
  });
};

for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function(e) {
    clear(e.srcElement.id)
  });
};
sqrtBtn.addEventListener('click', sqrtOperation)

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', operation);

minusBtn.addEventListener('click', minus);

function sqrtOperation() {
  display.value = Math.sqrt(memoryCurrentNumber);
}

function numberPress(number) {
  let localNumber = display.value;
  memoryPreviosClick = 'number';
  if (isWaitNextNumber) {
    localNumber = number;
    isWaitNextNumber = false;
  } else {
    if (display.value === "0") {
      localNumber = number;
    } else {
      localNumber += number;
    }
  };
  if (isNegativeNumber) {
    localNumber = '-' + localNumber;
    isNegativeNumber = false;
  }
  display.value = localNumber;
};

function operation(op) {
  memoryPreviosClick = 'operation';
  let localOperationMemory = display.value;
  if (isWaitNextNumber && memoryPendingOperation !== '=') {
    display.value = memoryCurrentNumber;
  } else {
    isWaitNextNumber = true;
    console.log(memoryCurrentNumber, localOperationMemory)
    switch (memoryPendingOperation) {
      case '+':
        memoryCurrentNumber = (parseFloat(localOperationMemory) * 1000 + parseFloat(memoryCurrentNumber) * 1000) / 1000;
        break;
      case '-':
        memoryCurrentNumber -= parseFloat(localOperationMemory);
        break;
      case '/':
        memoryCurrentNumber /= parseFloat(localOperationMemory);
        break;
      case '*':
        memoryCurrentNumber *= parseFloat(localOperationMemory);
        break;
      case '^':
        memoryCurrentNumber = memoryCurrentNumber ** localOperationMemory;
        break;
      default:
        memoryCurrentNumber = parseFloat(localOperationMemory);
    }
    display.value = memoryCurrentNumber;
    memoryPendingOperation = op;
  };
};

function decimal() {
  let localDecimalMemory = display.value;
  if (isWaitNextNumber) {
    localDecimalMemory = '0.';
    isWaitNextNumber = false;
  } else {
    if (localDecimalMemory.indexOf() === -1)
      localDecimalMemory += '.';
  }
  display.value = localDecimalMemory;
};

function clear(id) {
  if (id === 'ce') {
    display.value = "0";
    isWaitNextNumber = true;
  } else if (id === 'c') {
    display.value = "0";
    isWaitNextNumber = false;
    memoryCurrentNumber = "0";
    memoryPendingOperation = "0";
    memoryPreviosClick = '';
    isNegativeNumber = false;
  }
};


// function minus() {
//   let localOperationMemory = display.value;
//   if (memoryPreviosClick === 'number') {
//     if (isWaitNextNumber && memoryPendingOperation !== '=') {
//       display.value = memoryCurrentNumber;
//     } else {
//       isWaitNextNumber = true;
//       memoryCurrentNumber -= parseFloat(localOperationMemory);
//       display.value = memoryCurrentNumber;
//       memoryPendingOperation = '-';
//     };
//   } else {
//     isNegativeNumber = true;
//   }
//   console.log(isNegativeNumber);

// }
