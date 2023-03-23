class Calculator {
    constructor(prevOperTextElement, currentOperTextElement) {
        this.prevOperTextElement = prevOperTextElement
        this.currentOperTextElement = currentOperTextElement
        this.clear()
    }

    clear() {
        this.currentOper = ''
        this.prevOper = ''
        this.operation = undefined
    }

    delete() {
        this.currentOper = this.currentOper.toString().slice(0, -1)
    }

    appendNumber(num) {
        if (num === '.' && this.currentOper.includes('.')) return
        this.currentOper = this.currentOper.toString() + num.toString()
    }

    chooseOperation(oper) {
        if(this.currentOper === '') return
        if(this.prevOper !== '') {
            this.compute()
        }
        this.oper = oper
        this.prevOper = this.currentOper
        this.currentOper = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOper)
        const current = parseFloat(this.currentOper)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.oper) {
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case '*': 
                computation = prev * current
                break
            case '÷': 
                computation = prev / current
                break
            default:
                return
        }
        this.currentOper = computation
        this.oper = undefined
        this.prevOper = ''
    }

    getDisplayNumber(num) {
        const strNum = num.toString()
        const intDigits = parseFloat(strNum.split('.')[0])
        const decDigits =strNum.split('.')[1]
        let intDisplay
        if(isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decDigits != null) {
            return `${intDisplay}.${decDigits}`
        } else {
            return intDisplay
        }
    }

    updateDisplay() {
        this.currentOperTextElement.innerText = this.getDisplayNumber(this.currentOper)
        if(this.oper != null) {
        this.prevOperTextElement.innerText = `${this.getDisplayNumber(this.prevOper)}${this.oper}`
    } else {
        this.prevOperTextElement.innerText = ''
    }
}
}



const numButtons = document.querySelectorAll('[data-num]')
const operButtons = document.querySelectorAll('[data-oper]')
const equalsButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-del]')
const acButton = document.querySelector('[data-a-c]')
const prevOperTextElement = document.querySelector('[data-prev-oper]')
const currentOperTextElement = document.querySelector('[data-current-oper]')

const calculator = new Calculator(prevOperTextElement, currentOperTextElement)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})