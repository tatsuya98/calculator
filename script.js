const clear = document.querySelector('#blank')
const calculatorNumbers = document.querySelector('.numbers')
const screen = document.querySelector('.screen')
let number1
let number2
let operator
let currentNumber = ""
let screenText = ""
let result = ""
const evaluate = document.querySelector('#evaluate')
const add = (a,b) =>{
    return Number(a) + Number(b)
}
const subtract = (a,b) =>{
    return Number(a) - Number(b)
}

const multiply = (a,b) =>{
    return Number(a) * Number(b)
}

const divide = (a,b) =>{
    return Number(a) / Number(b)
}


const operate = (a,b,operator) =>{
    return operator == '+' ? add(a,b) : operator == '-' ? subtract(a,b) : operator == '*' ? multiply(a,b) : divide(a,b)
}

const addToValue = (e) =>{
    currentNumber = currentNumber.concat(e.currentTarget.value)
    number1 = currentNumber
    setScreenContent(number1)
}
const addToValue1 = (e) =>{
    currentNumber = currentNumber.concat(e.currentTarget.value)
    number2 = currentNumber
    setScreenContent(number2)
}
const changeNumberEvent = (first,second) =>{
    const numbers = document.querySelectorAll('.number')
    numbers.forEach((number)=>{
        number.removeEventListener('click',first)
        number.addEventListener('click',second)
    })
}
const resetVariable = () =>{
    if(result != ""){
        currentNumber = ""
        number1 = ""  
    }
    currentNumber = ""
    changeNumberEvent(addToValue,addToValue1)
}
const resetCalculator = () =>{
    currentNumber = ""
    number1 = ""
    number2 = ""
    operator= ""
    result=""
    screen.textContent = "0"
    changeNumberEvent(addToValue1,addToValue)
}
const changeOperatorLook = (operatorVariable) => {
    operatorVariable.style.backgroundColor = 'orange'
    operatorVariable.style.color = 'white'
    operatorVariable.style.borderColor = 'white'
}
const revertOperatorLook = (operatorVariable) =>{
    operatorVariable.style.backgroundColor = ''
    operatorVariable.style.color = ''
    operatorVariable.style.borderColor = ''
}
const setOperator = (e) =>{
    operatorVariable = e.currentTarget
    operator = operatorVariable.value
    changeOperatorLook(operatorVariable)
    resetVariable()
    operatorVariable.removeEventListener('click',setOperator)
    operatorVariable.addEventListener('click',deSelectOperator)
}
const deSelectOperator = (e) =>{
    operatorVariable = e.currentTarget
    operator = ""
    revertOperatorLook(operatorVariable)
    operatorVariable.addEventListener('click',setOperator)

}
const resetOperators = () =>{
    const reset = document.querySelectorAll('.reset')
    reset.forEach(variable =>{
        revertOperatorLook(variable)
        variable.removeEventListener('click',deSelectOperator)
        variable.addEventListener('click',setOperator)
    })
}
const setScreenContent = (content) =>{
    screenText = content
    screen.textContent = screenText
}
const setEvents = () =>{
    const reset = document.querySelectorAll('.reset')
    reset.forEach((button) =>{
        button.addEventListener('click',setOperator)

    })
}
const addNumbers = () =>{
    for(let i = 0; i <= 9; i++){
        let numberButton = document.createElement('button')
        numberButton.textContent = `${i}`
        numberButton.setAttribute('value',`${i}`)
        numberButton.setAttribute('class','number')
        calculatorNumbers.appendChild(numberButton)
        numberButton.addEventListener('click',addToValue)
    }
}
const continueCalculation = (number,operator) => {
    return operator == '+' ? add(result,number) : operator == '-' ? subtract(result,number) : operator == '*' ? multiply(result,number) : divide(result,number)
}
clear.addEventListener('click',resetCalculator)
evaluate.addEventListener('click',()=>{
    if(result == ""){
        result = operate(number1, number2, operator)
    }else{
        result = continueCalculation(number2,operator)
    }
    resetVariable()
    resetOperators()
    setScreenContent(result)
})
setEvents()
addNumbers()


