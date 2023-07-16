const displayP = document.getElementById('displayP');
const buttons = document.querySelectorAll('button');
displayP.textContent = "";

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', interface);
}

let operand1 = "", 
    operand2 = "", 
    operator = "";

function interface(e) {
    if (displayP.textContent === "undefined") {
        displayP.textContent = "";
    }
    if (e.target.classList.contains('digit')) { // If button pressed is a digit or decimal point...
        if (operator === "" && operator !== "?") { // If operator has not been set, we must be inputting into operand1...
            if (e.target.textContent === ".") {
                if (operand1 != "" && !operand1.includes(".")) {
                    displayP.textContent += e.target.textContent;
                    operand1 += e.target.textContent;
                }
            } else {
                displayP.textContent += e.target.textContent;
                operand1 += e.target.textContent;
            }
        } else if (operator !== "?") {
            if (e.target.textContent === ".") {
                if (operand2 != "" && !operand2.includes(".")) {
                    displayP.textContent += e.target.textContent;
                    operand2 += e.target.textContent;
                }
            } else {
                if (!Number(displayP.textContent)) {
                    displayP.textContent = "";
                }
                displayP.textContent += e.target.textContent;
                operand2 += e.target.textContent;
            }
        }
    } else if (e.target.classList.contains('orangeButton')) { // If button pressed is an operator
        if (operand1 !== "") { // Do nothing unless operand1 exists, and operator does not
            if (e.target.textContent === "=") {
                if (operand1 !== "" && operand2 !== "" && operator !== "" && operator !== "?") { // Only calculate if both operands and operator are set
                    if (calculate(operand1, operand2, operator) === "ERROR") {
                        displayP.textContent = "undefined";
                        operand1 = "", operand2 = "", operator = "";
                    } else {
                        displayP.textContent = calculate(operand1, operand2, operator).toFixed(3);
                        operand1 = displayP.textContent;
                        operator = "?";
                        operand2 = "";
                    }
                }
            } else {
                if (operand2 === "" && operand1 !== "" && (operator === "" || operator === "?")) { // If second operand has not been set, but first has...
                    displayP.textContent = e.target.textContent;
                    operator = e.target.textContent;
                    operand1 = Number(operand1);
                } else if (operand1 !== "" && operator !== "" && operand2 !== "") { // If operator and operands are set and operator is clicked...
                    operand1 = calculate(operand1, operand2, operator).toFixed(3);
                    displayP.textContent = operand1 + " " + e.target.textContent;
                    operator = e.target.textContent;
                    operand2 = "";
                }
            }
        }
    } else if (e.target.classList.contains('grayButton')) { // If button pressed is C, +/-, or %...
        if(e.target.textContent === "C") {
            operand1 = "", operand2 = "", operator = "";
            displayP.textContent = "";
        }
        else if (e.target.textContent === "+/-") {
            if (operand1 !== "" && operator === "") {
                displayP.textContent = -Number(displayP.textContent);
                operand1 = displayP.textContent;
            } else if (operand2 !== "" && operator !== "?") {
                displayP.textContent = -Number(displayP.textContent);
                operand2 = displayP.textContent;
            }
        }
        else if (e.target.textContent === "%") {
            if (operand1 !== "" && operator === "") {
                displayP.textContent = Number(displayP.textContent) / 100;
                operand1 = displayP.textContent;
            } else if (operand2 !== "" && operator !== "?") {
                displayP.textContent = Number(displayP.textContent) / 100;
                operand2 = displayP.textContent;
            }
        }
    }
    console.log(`${operand1} ${operator} ${operand2}`);
}

function calculate(a, b, c) {
    if (Number(b) == 0 && c === "/") {
        return "ERROR";
    } else {
        switch (c) {
            case "/":
                return a / b;
            case "x":
                return a * b;
            case "-":
                return a - b;
            case "+":
                return Number(a) + Number(b);
        }
    }
}
