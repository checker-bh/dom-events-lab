/*-------------------------------- Constants --------------------------------*/
const OPERATORS = ['+', '-', '*', '/'];
const DEFAULT_DISPLAY_VALUE = '0';

/*-------------------------------- Variables --------------------------------*/
let currentValue = '';
let previousValue = '';
let operator = '';
let shouldResetDisplay = false;

/*------------------------ Cached Element References ------------------------*/
const calculator = document.querySelector('#calculator');
const display = document.querySelector('.display');

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener('click', handleButtonClick);

/*-------------------------------- Functions --------------------------------*/
function handleButtonClick(event) {
    const buttonText = event.target.innerText;

    if (event.target.classList.contains('button')) {
        if (isNumber(buttonText) || buttonText === '.') {
            handleNumber(buttonText);
        } else if (isOperator(buttonText)) {
            handleOperator(buttonText);
        } else if (buttonText === 'C') {
            clearDisplay();
        } else if (buttonText === '=') {
            calculateResult();
        }
        updateDisplay();
    }
}

function isNumber(value) {
    return !isNaN(value);
}

function isOperator(value) {
    return OPERATORS.includes(value);
}

function handleNumber(number) {
    if (shouldResetDisplay) {
        currentValue = '';
        shouldResetDisplay = false;
    }
    if (number === '.' && currentValue.includes('.')) return;
    currentValue += number;
}

function handleOperator(op) {
    if (currentValue === '' && previousValue === '') return;
    if (currentValue === '') {
        operator = op;
        return;
    }
    if (previousValue !== '') {
        calculateResult();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = '';
    previousValue = '';
    shouldResetDisplay = true;
}

function clearDisplay() {
    currentValue = '';
    previousValue = '';
    operator = '';
    shouldResetDisplay = false;
    display.textContent = DEFAULT_DISPLAY_VALUE;
}

function updateDisplay() {
    if (shouldResetDisplay) {
        display.textContent = currentValue;
    } else {
        display.textContent = `${previousValue} ${operator} ${currentValue}`;
    }
}
