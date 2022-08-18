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
    if (b === 0) {
        alert("Dividing by zero is not allowed!")
        clearButtonEvent();
    } else {
        return a / b;
    }
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

    const decimalButton = document.querySelector("#decimal");
    if (displayString.toString().includes(".")) {
        decimalButton.style.backgroundColor = "#333333";
    } else {
        decimalButton.style.backgroundColor = "gray";
    }
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

    // if we have a value and a previous operator, apply it
    if (firstVal !== "" && op !== "") {
        let secondVal = displayString;
        let result = operate(op, +firstVal, +secondVal);

        displayString = result;
    }

    // if the user hit equals, we don't store the operator since the calc has been done
    if (currOp !== "equals") {
        op = currOp;
    } else {
        op = "";
    }

    // store for further operations
    firstVal = displayString;

    clearDisplay = true;    // make sure the next number pushed clears the display

    updateDisplay();
}

function deleteButtonEvent(e) {
    if (displayString.length > 1) {
        displayString = displayString.slice(0, displayString.length - 1);
    } else {
        displayString = "0";
    }
    updateDisplay();
}

function decimalButtonEvent(e) {
    if (!displayString.toString().includes(".")) {
        displayString += ".";
    }
    updateDisplay();
}

let displayString = "0";
let firstVal = "";
let op = "";
let clearDisplay = false;

updateDisplay();

const numButtons = document.querySelectorAll(".btn-num");
numButtons.forEach(button => button.addEventListener("click", numButtonEvent));

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearButtonEvent);

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", deleteButtonEvent);

const decimalButton = document.querySelector(".btn-decimal")
decimalButton.addEventListener("click", decimalButtonEvent);

const opButtons = document.querySelectorAll(".btn-op");
opButtons.forEach(button => button.addEventListener("click", opButtonEvent));