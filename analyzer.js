const languagePatterns = {
    python: {
        functionDef: /^def\s+(\w+)\s*\(/,
        forLoop: /^for\s+\w+\s+in\s+(range\(|.*:)/,
        whileLoop: /^while\s+.+:/,
        indentBased: true
    },
    javascript: {
        functionDef: /^(function\s+(\w+)|const\s+(\w+)\s*=|(\w+)\s*=\s*function)/,
        forLoop: /^for\s*\(/,
        whileLoop: /^while\s*\(/,
        indentBased: false,
        blockStart: '{',
        blockEnd: '}'
    },
    java: {
        functionDef: /^(public|private|protected)?\s*(static)?\s*\w+\s+(\w+)\s*\(/,
        forLoop: /^for\s*\(/,
        whileLoop: /^while\s*\(/,
        indentBased: false,
        blockStart: '{',
        blockEnd: '}'
    },
    cpp: {
        functionDef: /^(\w+\s+)*(\w+)\s*\(/,
        forLoop: /^for\s*\(/,
        whileLoop: /^while\s*\(/,
        indentBased: false,
        blockStart: '{',
        blockEnd: '}'
    }
};

const sampleCodes = {
    python: `def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`,
    javascript: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
}`,
    java: `public int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
    cpp: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
    }
}`
};

function analyzeComplexity(code, lang) {
    const patterns = languagePatterns[lang];
    if (!patterns) return { complexity: 'N/A', explanation: 'Language not supported' };

    let complexity = 'O(1)';
    let explanation = 'The code has constant complexity';

    // Check for function definitions
    if (patterns.functionDef.test(code)) {
        complexity = 'O(n)';
        explanation = 'The code defines a function that operates on n elements';
    }

    // Check for loops
    if (patterns.forLoop.test(code) || patterns.whileLoop.test(code)) {
        complexity = 'O(n^2)';
        explanation = 'The code contains nested loops, each iterating over n elements';
    }

    return { complexity, explanation };
}

// DOM references
const language = document.getElementById('language');
const code = document.getElementById('code');
const resultDiv = document.getElementById('result');
const sampleBtn = document.getElementById('sampleBtn');
const analyzeBtn = document.getElementById('analyzeBtn');

analyzeBtn.addEventListener('click', () => {
    const codeVal = code.value.trim();
    const langVal = language.value;

    if (!codeVal) {
        resultDiv.innerHTML = `
            <div class="error">
                <div class="complexity">⚠️</div>
                <div class="explanation">Please enter some code to analyze</div>
            </div>
        `;
        resultDiv.style.display = 'block';
        return;
    }

    const result = analyzeComplexity(codeVal, langVal);

    resultDiv.innerHTML = `
        <div class="complexity">${result.complexity}</div>
        <div class="explanation">${result.explanation}</div>
    `;
    resultDiv.style.display = 'block';
});

sampleBtn.addEventListener('click', () => {
    code.value = sampleCodes[language.value];
});

language.addEventListener('change', () => {
    if (!code.value.trim()) {
        code.value = sampleCodes[language.value];
    }
});

// Load initial sample
code.value = sampleCodes.python;