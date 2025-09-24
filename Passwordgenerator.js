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
    let password = [];
    const includedSets = [];

    // Build character set based on selected options
    if (uppercaseCheckbox.checked) {
        charset += UPPERCASE_CHARS;
        includedSets.push(UPPERCASE_CHARS);
    }
    if (lowercaseCheckbox.checked) {
        charset += LOWERCASE_CHARS;
        includedSets.push(LOWERCASE_CHARS);
    }
    if (numbersCheckbox.checked) {
        charset += NUMBER_CHARS;
        includedSets.push(NUMBER_CHARS);
    }
    if (symbolsCheckbox.checked) {
        charset += SYMBOL_CHARS;
        includedSets.push(SYMBOL_CHARS);
    }

    // Validate at least one option is selected
    if (charset === '') {
        alert('Please select at least one character type');
        return;
    }

    // Ensure at least one character from each selected set is included
    includedSets.forEach(set => {
        const randomIndex = Math.floor(Math.random() * set.length);
        password.push(set[randomIndex]);
    });

    // Generate the rest of the password
    const length = lengthSlider.value;
    const remainingLength = length - password.length;

    for (let i = 0; i < remainingLength; i++) {
        const randomBytes = new Uint32Array(1);
        window.crypto.getRandomValues(randomBytes);
        const randomIndex = randomBytes[0] % charset.length;
        password.push(charset[randomIndex]);
    }

    // Shuffle the password array to avoid predictable character placement and join to a string
    const finalPassword = password.sort(() => Math.random() - 0.5).join('');

    // Update display and strength meter
    passwordDisplay.textContent = finalPassword;
    updateStrengthMeter(finalPassword);
}


    // Update strength meter based on password complexity
function updateStrengthMeter(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;

    // Character type checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Map strength score (0-6) to percentage and feedback
    let strengthPercent = (strength / 6) * 100;
    let color = '#ff6b6b'; // Very Weak
    let feedbackText = 'Very weak. Increase length and add character types.';

    if (strengthPercent > 80) { // Strong (5-6 points)
        color = '#40c057';
        feedbackText = 'Strong password!';
    } else if (strengthPercent > 50) { // Moderate (3-4 points)
        color = '#94d82d';
        feedbackText = 'Moderate. Consider adding more symbols or length.';
    } else if (strengthPercent > 25) { // Weak (2 points)
        color = '#ffd43b';
        feedbackText = 'Weak. Include more character types and increase length.';
    }

    // Update strength meter and feedback
    strengthMeter.style.width = `${strengthPercent}%`;
    strengthMeter.style.background = color;
    feedback.textContent = feedbackText;
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