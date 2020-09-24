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
let memoryNewNumber = false;


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
  console.log(number, display.value);
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  };
};

function operation(op) {
  let localOperationMemory = display.value;
  if (memoryNewNumber && memoryPendingOperation !== '=') {
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
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
  if (memoryNewNumber) {
    localDecimalMemory = '0.';
    memoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf() === -1)
      localDecimalMemory += '.';
  }
  display.value = localDecimalMemory;
};

function clear(id) {
  if (id === 'ce') {
    display.value = "0";
    memoryNewNumber = true;
  } else if (id === 'c') {
    display.value = "0";
    memoryNewNumber = false;
    memoryCurrentNumber = "0";
    memoryPendingOperation = "0";
  }
};

function minus() {
  let localOperationMemory = display.value;
  if (!memoryNewNumber) {
    isNegativeNumber = true;

  }
  if (memoryNewNumber && memoryPendingOperation !== '=') {
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    memoryCurrentNumber -= parseFloat(localOperationMemory);
    display.value = memoryCurrentNumber;
    memoryPendingOperation = '-';
  };
}
