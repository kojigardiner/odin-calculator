// Fundamental operations
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

// Returns the result of applying the operator op on operands a and b
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

// Updates the text shown on the display element
function updateDisplay() {
    const display = document.querySelector(".display");
    display.textContent = displayString;

    // if there is a decimal in the current value being displayed, we
    // need to disable the decimal button (gray it out)
    const decimalButton = document.querySelector("#decimal");
    if (displayString.toString().includes(".")) {
        decimalButton.style.backgroundColor = "#333333";
    } else {
        decimalButton.style.backgroundColor = "gray";
    }
}

// Handle number button presses
function numButtonEvent(e) {
    const button = e.target;

    // If the clearDisplay flag is set, we start new entries in a fresh string
    if (clearDisplay) {
        displayString = button.textContent;
        clearDisplay = false;
        // handle the special case of a 0 on the display, where we don't want to append
        // another 0
    } else if (displayString === "0") {
        if (button.textContent !== "0") {
            displayString = button.textContent;
        }
    } else if (displayString.toString().length < MAXCHARS) {
        displayString += button.textContent;
    }
    updateDisplay();
}

// Handle clear button press
function clearButtonEvent(e) {
    displayString = "0";
    firstVal = "";
    op = "";

    updateDisplay();
}

// Rounds a decimal value string to fit within the display
function roundDecimal(string) {
    let parts = string.toString().split(".");
    let decimalLength = MAXCHARS - parts[0].length - 1; // length remaining for the decimal
    let result = parseFloat(result.toString()).toFixed(decimalLength);

    return result;
}

// Handle operate button presses (e.g. =, x, /, +, -)
function opButtonEvent(e) {
    const button = e.target;

    let currOp = button.getAttribute("id");

    // if we already have a value stored as well as a previous operator, first we need to apply it
    if (firstVal !== "" && op !== "") {
        let secondVal = displayString;
        let result = operate(op, +firstVal, +secondVal);

        // deal with display overflow
        if (result.toString().length > MAXCHARS) {
            if (result.toString().includes(".")) {  // if we have a floating point value, we need to carefully round
                result = roundDecimal(result);
            } else {  // if no decimal, we've hit an int overflow condition and should cap to the max possible value
                result = "9".repeat(MAXCHARS);
            }
        };
        displayString = result;
    }

    // if the user hit equals, we don't store the operator since the calc has been done above
    if (currOp === "equals") {
        op = "";
    } else {
        op = currOp;
    }

    // store for further operations
    firstVal = displayString;

    clearDisplay = true;    // make sure the next number entered clears the display

    updateDisplay();
}

// Handle delete button press
function deleteButtonEvent(e) {
    if (displayString.length > 1) {
        displayString = displayString.slice(0, displayString.length - 1);
    } else {
        displayString = "0";
    }
    updateDisplay();
}

// Handle decimal button press
function decimalButtonEvent(e) {
    if (!displayString.toString().includes(".") && displayString.toString().length < MAXCHARS) {
        displayString += ".";
    }
    updateDisplay();
}

// Handle keyboard press
function keyEvent(e) {
    const button = document.querySelector(`button[data-key="${e.keyCode}"]`)
    if (button) {
        let event = new Event("click");
        button.dispatchEvent(event);
    }
}

// Script starts here

const MAXCHARS = 12;        // this may need to be updated depending on the CSS
let displayString = "0";
let firstVal = "";
let op = "";
let clearDisplay = false;

updateDisplay();

// Setup event listeners
const numButtons = document.querySelectorAll(".btn-num");
numButtons.forEach(button => button.addEventListener("click", numButtonEvent));

const clearButton = document.querySelector(".btn-clear");
clearButton.addEventListener("click", clearButtonEvent);

const deleteButton = document.querySelector(".btn-delete");
deleteButton.addEventListener("click", deleteButtonEvent);

const decimalButton = document.querySelector(".btn-decimal")
decimalButton.addEventListener("click", decimalButtonEvent);

const opButtons = document.querySelectorAll(".btn-op");
opButtons.forEach(button => button.addEventListener("click", opButtonEvent));

document.addEventListener("keydown", keyEvent);