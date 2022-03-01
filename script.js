let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let userNumber = ''
let lastKey = ''
let operator = ''
let equalFlag = false;

function operate(operator, a, b) {
    const mathDict = {'+': add, '-': subtract, '*': multiply, '/': divide};
    let answer = mathDict[operator](Number(a), Number(b));
    if (operator === '/' && b === '0') {
        answer = 0
        document.getElementById('error').textContent = "Can't divide by zero";
    };
    if (!Number.isInteger(answer)) {
        answer = Number.parseFloat(answer).toFixed(1);
    }
    updateDisplay(answer, lastKey, operator);
    userNumber = answer;
    equalFlag = true;
};

function updateDisplay(userNumber, lastKey, operator) {
    document.getElementById('userNumber').textContent = userNumber;
    document.getElementById('operation').textContent = operator;
    document.getElementById('lastKey').textContent = lastKey;
};

function updateNum(keyNum) {
    if (operator === '') {
        if (keyNum === '.' && userNumber.includes('.')) {
            keyNum = '';
        }
        userNumber += keyNum;
        updateDisplay(userNumber);
    }
    else if (equalFlag === false){ // If the user hasn't clicked '=' yet, they can continue adding to the number
        if (keyNum === '.' && lastKey.includes('.')) {
            keyNum = '';
        }
        lastKey += keyNum;
        updateDisplay(userNumber, lastKey, operator);
    }
    else { // If the user has clicked '=', we will reset the lastKey once a new number is entered. This prevents lastkey from growing forever.
        lastKey = keyNum;
        updateDisplay(userNumber, lastKey, operator);
        equalFlag = false;
    }
}

function setOperator(keyNum) {
    if (operator !== '') { // evaluate any existing values before updating the operator
        operate(operator, userNumber, lastKey);
        operator = '';
    }
    operator = keyNum;           
    updateDisplay(userNumber, lastKey, operator);
};

function numDel() {
    if (lastKey > 0) {
        lastKey = lastKey.slice(0, -1);
        updateDisplay(userNumber, lastKey, operator);
    }
    else if (userNumber > 0 && operator === '') {
        userNumber = userNumber.slice(0, -1);
        updateDisplay(userNumber, lastKey, operator);
        }
}

function clearDisplay() {
    userNumber = '';
    lastKey = '';
    operator = '';
    equalFlag = false;
    updateDisplay(userNumber, lastKey, operator);
    document.getElementById('error').textContent = "";
}


// Handlers for mouse inputs
const BUTTONS = document.querySelectorAll('button');

Array.from(BUTTONS).forEach(function(event) {
    event.addEventListener("click", function() {
        let keyNum = this.textContent;
        if (this.className === 'number') {
            updateNum(keyNum);
        }
        else if (this.className === 'operator') {
            setOperator(keyNum);
        }
        else if (keyNum === 'Del') {
            numDel();
        }
        else if (this.id === 'clear') {
            clearDisplay();
        }
        else if (this.id === 'equals') {
            operate(operator, userNumber, lastKey);
        }
    })})

// Handlers for keyboard inputs
document.addEventListener("keydown", function(event) {
    keyNum = event.key;
    let opArray = ['+', '-', '*', '/']
    if (keyNum >= 0 || keyNum === '.') {
        updateNum(keyNum);
    }
    else if (opArray.includes(keyNum)) {
        setOperator(keyNum);
    }
    else if (keyNum === 'Enter') {
        operate(operator, userNumber, lastKey);
    }
    else if (keyNum === 'c') {
        clearDisplay();
    }
    else if (keyNum === 'Backspace' || keyNum === 'Delete') {
        numDel();
    }
})