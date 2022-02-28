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

const BUTTONS = document.querySelectorAll('button');

Array.from(BUTTONS).forEach(function(event) {
    event.addEventListener("click", function() {
        let key = this.textContent;
        if (this.className === 'number') {
            if (operator === '') {
                userNumber += key;
                updateDisplay(userNumber);
            }
            else if (equalFlag === false){ // If the user hasn't clicked '=' yet, they can continue adding to the number
                lastKey += key;
                updateDisplay(userNumber, lastKey, operator);
            }
            else { // If the user has clicked '=', we will reset the lastKey once a new number is entered. This prevents lastkey from growing forever.
                lastKey = key;
                updateDisplay(userNumber, lastKey, operator);
                equalFlag = false;
            }
        }
        else if (this.className === 'operator') {
            if (operator !== '') { // evaluate any existing values before updating the operator
                operate(operator, userNumber, lastKey);
                operator = '';
            }
            operator = key;           
            updateDisplay(userNumber, lastKey, operator);
        }
        else if (this.className === 'fn') {
            if (key === 'Del') {
                if (userNumber > 0) {
                    userNumber = userNumber.slice(0, -1);
                    updateDisplay(userNumber)
                }
            }
        }
        else if (this.id === 'clear') {
            userNumber = '';
            lastKey = '';
            operator = '';
            equalFlag = false;
            updateDisplay(userNumber, lastKey, operator);
        }
        else if (this.id === 'equals') {
            operate(operator, userNumber, lastKey);
            
        }
    })})

