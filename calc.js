function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    switch (op) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
        default:
            console.log(`Operator ${op} not recognized`);
            break;
    }
}

function updateDisplay() {
    const display = document.querySelector(".display");
    display.textContent = displayString;
}

function numButtonEvent(e) {
    const button = e.target;

    // If the clearDisplay flag is set, we start new entries in a fresh string
    if (clearDisplay) {
        displayString = button.textContent;
        clearDisplay = false;
    } else if (displayString === "0") {
        if (button.textContent !== "0") {
            displayString = button.textContent;
        }
    } else {
        displayString += button.textContent;
    }
    updateDisplay();
}

function clearButtonEvent(e) {
    displayString = "0";
    firstVal = "";
    op = "";
    updateDisplay();
}

function opButtonEvent(e) {
    const button = e.target;

    let currOp = button.getAttribute("id");

    // if we have a value and an previous operator, apply it
    if (firstVal !== "" && (op !== "" || currOp === "equals")) {
        let secondVal = displayString;
        let result = operate(op, +firstVal, +secondVal);

        displayString = result;

        // store the result and the operator that was clicked
        firstVal = result;
    } else {
        firstVal = displayString;
    }

    // if the user hit equals, we don't store the operator since the calc has been done
    if (currOp === "equals") {
        op = "";
    } else {
        op = currOp;
    }

    clearDisplay = true;    // make sure the next number pushed clears the display

    updateDisplay();
}

let displayString = "0";
let firstVal = "";
let op = "";
let clearDisplay = false;

updateDisplay();

const numButtons = document.querySelectorAll(".btn-num");
numButtons.forEach(button => button.addEventListener("click", numButtonEvent));

const clearButton = document.querySelector(".btn-clear");
clearButton.addEventListener("click", clearButtonEvent);

const opButtons = document.querySelectorAll(".btn-op");
opButtons.forEach(button => button.addEventListener("click", opButtonEvent));
