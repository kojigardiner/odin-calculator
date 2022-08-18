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

console.log(add(5, 4));
console.log(subtract(5, 8));
console.log(multiply(5, 4));
console.log(divide(5, 4));
console.log(operate("add", 5, 4));