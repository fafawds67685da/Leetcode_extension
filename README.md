
# ⚡ Leetcode Extension – Complexity Analyzer

A lightweight Chrome extension that analyzes code snippets and gives an estimated **time complexity** (Big O notation) for Leetcode-style problems.

## 🚀 Features

- Supports **Python, JavaScript, Java, and C++**
- Provides **sample code** for each language
- Estimates **time complexity** based on patterns like nested loops and recursion
- Clean, modern UI with interactive buttons
- Works completely offline – no server required

## 🧠 How It Works

- Uses simple pattern recognition (like regex) to detect:
  - Function definitions
  - For/While loops
  - Nesting structures
- Based on the patterns found, it estimates:
  - O(1) – Constant
  - O(n) – Linear
  - O(n²) – Quadratic (e.g. nested loops)

## 📁 Project Structure

- `chrome-extension-analyzer.html` – Main popup interface (UI)
- `analyzer.js` – Logic to analyze code and estimate complexity
- `style.css` – UI styling
- `manifest.json` – Chrome extension config

## 🛠️ Installation

1. Download or clone the project.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked**.
5. Select the folder containing this extension.

## 🧪 Usage

1. Click the **Leetcode Extension** icon in Chrome.
2. Select a programming language.
3. Paste your code or click **Sample**.
4. Click **Analyze Complexity** to see the result.

## 📸 Screenshots

> Not included here, but feel free to add some!

## 🧩 Example Code (Python)

```python
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```

**Estimated Output**: O(n²) – Nested loops

## 📌 Limitations

- This tool uses pattern matching (not real code execution or AST parsing)
- It may **overestimate** or **underestimate** complexity for advanced logic

## 🙌 Author

**Dev Goyal**

---

Built to make algorithm analysis faster while solving Leetcode. Happy Hacking!
