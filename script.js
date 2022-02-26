let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

function operate(operator, a, b) {
    const mathDict = {'+': add, '-': subtract, '*': multiply, '/': divide};
    let answer = mathDict[operator](a, b);
    return answer;
}

