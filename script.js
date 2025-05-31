const API_KEY = "781ba2d7cd7762e6bdf8844f"
const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`

//calculator

let currentInput = '';
let currentOperation = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
}

function appendOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    document.getElementById('display').value = `${previousInput} ${currentOperation}`;
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperation) {
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
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
    document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    document.getElementById('display').value = '';
}

//exchange 
const change = document.querySelector('.change-icon')
const output = document.querySelector('.output')
const selectOptionFrom = document.querySelector('#currency-from-select')
const selectOptionTo = document.querySelector('#currency-to-select')
window.addEventListener("load", () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const currencyList = Object.entries(data.conversion_rates)
            currencyList.forEach(currency => {
                const opt = document.createElement('option')
                opt.value = currency[1]
                opt.innerHTML = currency[0]
                selectOptionFrom.appendChild(opt)
            })

            currencyList.forEach(currency => {
                const opt = document.createElement('option')
                opt.value = currency[1]
                opt.innerHTML = currency[0]
                selectOptionTo.appendChild(opt)
            })
        })
})
change.addEventListener('click', () => {
    console.log("change")
    const currencyFrom = selectOptionFrom.value
    const currencyTo = selectOptionTo.value
    const result = (display.value / currencyFrom) * currencyTo
    output.value = result.toFixed(2)
})