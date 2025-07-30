
function analyzeTimeComplexity(code) {
  const lines = code.split('\n');
  let maxLoopDepth = 0;
  let currentDepth = 0;
  const recursionFuncs = new Set();
  let currentFunc = null;

  for (let rawLine of lines) {
    const line = rawLine.trim();

    // Detect function definition
    const funcMatch = line.match(/^def\s+(\w+)\s*\(/);
    if (funcMatch) {
      currentFunc = funcMatch[1];
    }

    // Detect recursion
    if (currentFunc && line.includes(currentFunc + '(')) {
      recursionFuncs.add(currentFunc);
    }

    // Detect loop starts (basic)
    if (/^for\s+\w+\s+in\s+range\(/.test(line) || /^while\s+/.test(line)) {
      currentDepth += 1;
      if (currentDepth > maxLoopDepth) {
        maxLoopDepth = currentDepth;
      }
    }

    // Detect dedent by tracking whitespace (Python-style)
    const indent = rawLine.match(/^ */)?.[0]?.length || 0;
    const nextLine = lines[lines.indexOf(rawLine) + 1];
    if (nextLine) {
      const nextIndent = nextLine.match(/^ */)?.[0]?.length || 0;
      if (nextIndent < indent) {
        currentDepth -= 1;
      }
    }
  }

  // Estimate time complexity
  let complexity = 'O(1)';
  if (recursionFuncs.size > 0) {
    complexity = 'O(2^n) or O(n)' + ' (recursive)';
  } else if (maxLoopDepth === 1) {
    complexity = 'O(n)';
  } else if (maxLoopDepth === 2) {
    complexity = 'O(n^2)';
  } else if (maxLoopDepth >= 3) {
    complexity = `O(n^${maxLoopDepth})`;
  }

  return {
    estimated: complexity,
    details: {
      recursionDetected: recursionFuncs.size > 0,
      functionsWithRecursion: Array.from(recursionFuncs),
      loopDepth: maxLoopDepth,
    }
  };
}
