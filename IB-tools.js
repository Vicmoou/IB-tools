/* Enhanced calculator logic */

let display = document.getElementById('result');
let currentInput = '';
let shouldResetDisplay = false;

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple operators in a row except for unary minus
    const lastChar = currentInput.slice(-1);
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(value) && operators.includes(lastChar) && value !== '-') {
        return;
    }
    
    if (value === '-' && (currentInput === '' || operators.includes(lastChar))) {
        // Allow unary minus
    } else if (operators.includes(value) && lastChar === '.') {
        return; // Prevent operator after decimal without number
    }
    
    currentInput += value;
    display.value = currentInput;
    display.style.transition = 'all 0.2s ease';
    display.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
    setTimeout(() => {
        display.style.boxShadow = 'none';
    }, 200);
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
    shouldResetDisplay = false;
    // Optional: Play clear sound
    // new Audio('clear.mp3').play();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function calculate() {
    if (currentInput === '') return;
    
    try {
        let expression = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/,/g, '.')
            .replace(/%/g, '/100')  // Support percentage
            .replace(/√/g, 'Math.sqrt');  // Support sqrt if added
        
        // Improved validation
        if (!/^[0-9+\-*/.%√ ]+$/.test(expression.replace(/Math\.sqrt/g, '√'))) {
            throw new Error('Invalid expression');
        }
        
        // Use Function for safer eval with Math
        let result = Function('"use strict"; return (' + expression + ')')();
        
        // Format result
        if (Number.isInteger(result)) {
            display.value = result;
        } else {
            display.value = parseFloat(result.toFixed(10)).toString().replace(/\.?0+$/, '');
        }
        
        currentInput = display.value;
        shouldResetDisplay = true;
        display.focus();  // Better UX
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
        shouldResetDisplay = true;
        setTimeout(clearDisplay, 1500);
    }
}

// Enhanced keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});