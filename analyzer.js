// ...existing code from <script> in HTML, but with the following improvements...

// DOM references
const form = document.getElementById('analyzerForm');
const codeArea = document.getElementById('code');
const languageSelect = document.getElementById('language');
const resultDiv = document.getElementById('result');
const sampleBtn = document.getElementById('sampleBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const analyzeBtnText = document.getElementById('analyzeBtnText');
const loadingSpinner = document.getElementById('loadingSpinner');

// ...existing languagePatterns and sampleCodes...

// ...existing analyzeComplexity function...

function showLoading(show) {
    if (show) {
        analyzeBtn.setAttribute('disabled', 'disabled');
        analyzeBtnText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
    } else {
        analyzeBtn.removeAttribute('disabled');
        analyzeBtnText.style.display = '';
        loadingSpinner.style.display = 'none';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = codeArea.value.trim();
    const language = languageSelect.value;

    if (!code) {
        resultDiv.innerHTML = `
            <div class="error">
                <div class="complexity">⚠️</div>
                <div class="explanation">Please enter some code to analyze</div>
            </div>
        `;
        resultDiv.style.display = 'block';
        return;
    }

    showLoading(true);
    setTimeout(() => {
        const result = analyzeComplexity(code, language);
        resultDiv.innerHTML = `
            <div class="complexity">${result.complexity}</div>
            <div class="explanation">${result.explanation}</div>
        `;
        resultDiv.style.display = 'block';
        showLoading(false);
    }, 350); // Simulate processing delay for UX
});

sampleBtn.addEventListener('click', () => {
    codeArea.value = sampleCodes[languageSelect.value];
    codeArea.focus();
});

languageSelect.addEventListener('change', () => {
    if (!codeArea.value.trim()) {
        codeArea.value = sampleCodes[languageSelect.value];
    }
});

window.addEventListener('DOMContentLoaded', () => {
    codeArea.value = sampleCodes.python;
    codeArea.setAttribute('aria-label', 'Paste your code here');
    codeArea.setAttribute('tabindex', '0');
    resultDiv.setAttribute('tabindex', '0');
});
