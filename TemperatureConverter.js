// Get DOM elements
const celsiusInput = document.getElementById('celsius');
const fahrenheitInput = document.getElementById('fahrenheit');
const kelvinInput = document.getElementById('kelvin');

// Add event listeners for input changes
celsiusInput.addEventListener('input', () => convertFromCelsius(celsiusInput.value));
fahrenheitInput.addEventListener('input', () => convertFromFahrenheit(fahrenheitInput.value));
kelvinInput.addEventListener('input', () => convertFromKelvin(kelvinInput.value));

// Conversion functions
function convertFromCelsius(celsius) {
    if (celsius === '') {
        clearOtherInputs('celsius');
        return;
    }
    
    const c = parseFloat(celsius);
    const f = (c * 9/5) + 32;
    const k = c + 273.15;
    
    fahrenheitInput.value = roundToThreeDecimals(f);
    kelvinInput.value = roundToThreeDecimals(k);
}

function convertFromFahrenheit(fahrenheit) {
    if (fahrenheit === '') {
        clearOtherInputs('fahrenheit');
        return;
    }
    
    const f = parseFloat(fahrenheit);
    const c = (f - 32) * 5/9;
    const k = (f - 32) * 5/9 + 273.15;
    
    celsiusInput.value = roundToThreeDecimals(c);
    kelvinInput.value = roundToThreeDecimals(k);
}

function convertFromKelvin(kelvin) {
    if (kelvin === '') {
        clearOtherInputs('kelvin');
        return;
    }
    
    const k = parseFloat(kelvin);
    const c = k - 273.15;
    const f = (k - 273.15) * 9/5 + 32;
    
    celsiusInput.value = roundToThreeDecimals(c);
    fahrenheitInput.value = roundToThreeDecimals(f);
}

// Helper functions
function roundToThreeDecimals(num) {
    return Math.round(num * 1000) / 1000;
}

function clearOtherInputs(sourceInput) {
    if (sourceInput !== 'celsius') celsiusInput.value = '';
    if (sourceInput !== 'fahrenheit') fahrenheitInput.value = '';
    if (sourceInput !== 'kelvin') kelvinInput.value = '';
}

// Copy value to clipboard
async function copyValue(inputId) {
    const input = document.getElementById(inputId);
    const value = input.value;
    
    if (!value) return;

    try {
        await navigator.clipboard.writeText(value);
        const button = input.nextElementSibling;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    } catch (err) {
        alert('Failed to copy value');
    }
}