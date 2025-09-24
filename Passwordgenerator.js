// Character sets for password generation
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// DOM Elements
const passwordDisplay = document.getElementById('passwordDisplay');
const copyButton = document.getElementById('copyButton');
const lengthSlider = document.getElementById('lengthSlider');
const lengthDisplay = document.getElementById('lengthDisplay');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('generateButton');
const strengthMeter = document.getElementById('strengthMeter');
const feedback = document.getElementById('feedback');

// Event Listeners
lengthSlider.addEventListener('input', updateLengthDisplay);
generateButton.addEventListener('click', generatePassword);
copyButton.addEventListener('click', copyToClipboard);

// Update length display when slider moves
function updateLengthDisplay() {
    lengthDisplay.textContent = `${lengthSlider.value} characters`;
}

// Generate password based on selected options
function generatePassword() {
    let charset = '';
    let password = '';
    
    // Build character set based on selected options
    if (uppercaseCheckbox.checked) charset += UPPERCASE_CHARS;
    if (lowercaseCheckbox.checked) charset += LOWERCASE_CHARS;
    if (numbersCheckbox.checked) charset += NUMBER_CHARS;
    if (symbolsCheckbox.checked) charset += SYMBOL_CHARS;

    // Validate at least one option is selected
    if (charset === '') {
        alert('Please select at least one character type');
        return;
    }

    // Generate password
    const length = lengthSlider.value;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Update display and strength meter
    passwordDisplay.textContent = password;
    updateStrengthMeter(password);
}


    // Update strength meter based on password complexity
function updateStrengthMeter(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 12) strength += 25;
    else if (password.length >= 8) strength += 10;

    // Character type checks
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    // Update strength meter and feedback
    strengthMeter.style.width = `${strength}%`;
    
    // Update color and feedback based on strength
    if (strength <= 25) {
        strengthMeter.style.background = '#ff6b6b';
        feedback.textContent = 'Very weak, please use more character types and increase length.';
    } else if (strength <= 50) {
        strengthMeter.style.background = '#ffd43b';
        feedback.textContent = 'Weak, include more character types and increase length.';
    } else if (strength <= 75) {
        strengthMeter.style.background = '#94d82d';
        feedback.textContent = 'Moderate, consider adding more symbols.';
    } else {
        strengthMeter.style.background = '#40c057';
        feedback.textContent = 'Strong password!';
    }
    // Update color and feedback based on strength
    if (strength <= 25) {
        strengthMeter.style.background = '#ff6b6b';
        feedback.textContent = 'Very weak, please use more character types and increase length.';
    } else if (strength <= 50) {
        strengthMeter.style.background = '#ffd43b';
        feedback.textContent = 'Weak, include more character types and increase length.';
    } else if (strength <= 75) {
        strengthMeter.style.background = '#94d82d';
        feedback.textContent = 'Moderate, consider adding more symbols.';
    } else {
        strengthMeter.style.background = '#40c057';
        feedback.textContent = 'Strong password!';
    }






    
    // Color based on strength
    if (strength <= 25) {
        strengthMeter.style.background = '#ff6b6b';
    } else if (strength <= 50) {
        strengthMeter.style.background = '#ffd43b';
    } else if (strength <= 75) {
        strengthMeter.style.background = '#94d82d';
    } else {
        strengthMeter.style.background = '#40c057';
    }
}
// Copy password to clipboard
async function copyToClipboard() {
    // Check if there's a password to copy
    if (passwordDisplay.textContent === 'Click Generate to create password') {
        return;
    }

    try {
        // Copy the password to clipboard
        await navigator.clipboard.writeText(passwordDisplay.textContent);
        
        // Show feedback to user
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        
        // Reset button text after 2 seconds
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    } catch (err) {
        alert('Failed to copy password');
    }
}