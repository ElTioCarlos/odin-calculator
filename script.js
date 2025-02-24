let line = document.querySelector("#line1")
let resultLine = document.querySelector("#result")

const operadores = ["-","+","*","/"]
const numeros = ["0","1","2","3","4","5","6","7","8","9"]

let [num1,num2,result,operator] = ["","","",""]
let waitNum2 = true

let key = document.querySelector("#options").addEventListener("click", (event) => {
    let simbol = event.target.id;
    inputs(simbol)
})

function inputs(input) {

    //Numeros
    if (search(input, numeros)) {
        if (waitNum2) {
            num1 += input
            line.textContent += input
        } else {
            num2 += input
            line.textContent += input
        }
    }

    //Operadores
    if ((search(input, operadores) && num1 != "")) {
        
        if (waitNum2) {
            waitNum2 = false
            operator = input
            line.textContent += input
        
        } else if (num2 != "") {  
            result = operate(num1, num2, operator);
            
            num1 = result;
            num2 = "";
            operator = input;

            line.textContent = `${num1}${operator}`;
            resultLine.textContent = num1;
        }
    }

    //Igual
    if (input === "=") {
        
        if (((num1 != "") && (num2 != "") && (operator != ""))){
            result = operate(num1, num2, operator)
            resultLine.textContent = result
        }
    }

    //Clear
    if (input === "C") {
        line.textContent = "";
        resultLine.textContent = "0";
        reset();
    }
}

function operate(num1, num2, operator) {
    let result
    
    num1 = parseInt(num1)
    num2 = parseInt(num2)

    if (operator === "+") result = num1 + num2
    if (operator === "-") result = num1 - num2
    if (operator === "*") result = num1 * num2
    if (operator === "/") result = num1 / num2

    result = result.toString()
    return result
}

function reset() {
    num1 = "";
    num2 = "";
    result = "";
    waitNum2 = true;
}

function search(value, search) {
    return search.some(i => i.includes(value))
}