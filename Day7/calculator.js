let currentInput = '';
let expressionParts = [];
let justEvaluated = false;

function formatNumber(val) {
    if (val === '') return '0';
    if (isNaN(val)) return 'Error';
    if (!isFinite(val)) return 'Error';

    const num = Number(val);
    const str = num.toString();

    if (str.includes('e')) {
        return num.toPrecision(7).toString();
    }

    if (str.includes('.') && str.split('.')[1].length > 10) {
        return parseFloat(num.toFixed(10)).toString();
    }
    return str;
}

function getDisplayOperator(op) {
        if (op === '*') return '×';
        if (op === '/') return '÷';
        if (op === '-') return '-';
        return op;
}

function updateDisplay() {
    const primaryDisplay = document.getElementById('primaryDisplay');
    const expressionDisplay = document.getElementById('expressionDisplay');

    let exprStr = expressionParts.map(part => {
        if (['+', '-', '*', '/'].includes(part)) {
            return ` ${getDisplayOperator(part)}`;
        }
        return formatNumber(part);
    }).join('');

    if (currentInput !== '') {
        primaryDisplay.textContent = formatNumber(currentInput);
    } else if (expressionParts.length > 0 && ['+', '-', '*', '/'].includes(expressionParts[expressionParts.length -1])) {

        const prevOpIndex = expressionParts.length - 2;
        primaryDisplay.textContent = prevOpIndex >= 0 ? formatNumber(expressionParts[prevOpIndex]) : '0';
    } else {
        primaryDisplay.textContent = 0;
    }

    expressionDisplay.textContent = exprStr;
}

function evaluateExpression(tokens) {
    if (tokens.length === 0) return 0;

    let workTokens = [...tokens];

    if (['+', '-', '*', '/'].includes(workTokens[workTokens.length - 1])) {
        workTokens.pop();
    }

    if (workTokens.length === 0) return 0;

    for (let i = 0; i < workTokens.length; i++) {
        if (workTokens[i] === '*' || workTokens[i] === '/') {
            const left = Number(workTokens[i - 1]);
            const right = Number(workTokens[i + 1]);

            let result;
            if (workTokens[i] === '*') {
                result = left * right;
            }else {
                if (right === 0) return NaN;
                result = left / right;
            }

            workTokens.splice(i - 1, 3, result);
            i--;
        }
    }

    let result = Number(workTokens[0]);
    for (let i = 1; i < workTokens.length; i += 2) {
        const op = workTokens[i];
        const val = Number(workTokens[i +1]);
        if (op === '+') {
            result += val;
        } else if (op === '-') {
            result -= val;
        }
    }

    return result;
}

function handleDigit(digit) {
    if (justEvaluated) {
        currentInput = '';
        expressionParts = [];
        justEvaluated = false;
    }

    if (digit === '.') {
        if (currentInput.includes('.')) return;
        if (currentInput === '') {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
    } else {
        if (currentInput === '0') {
            currentInput = digit;
        } else {
            currentInput += digit;
        }
    }
    updateDisplay();
}

function handleOperator(op) {
    justEvaluated = false;

    if (currentInput !== '') {
        expressionParts.push(currentInput);
        expressionParts.push(op);
        currentInput = '';
    } else if (expressionParts.length > 0) {
    const lastPart = expressionParts[expressionParts.length - 1];
    if (['+', '-', '*', '/'].includes(lastPart)) {
        expressionParts[expressionParts.length - 1] = op;
    } else {
        expressionParts.push(op);
    }
    } else {
        expressionParts.push('0');
        expressionParts.push(op);
    }

    updateDisplay();
}

function handleEvaluate() {
    if(currentInput !== '') {
        expressionParts.push(currentInput);
    }

    if (expressionParts.length === 0) return;
    const lastPart = expressionParts[expressionParts.length - 1];
    if (['+', '-', '*', '/'].includes(lastPart)) {
        expressionParts.pop();
    }

    if (expressionParts.length === 0) return;

    const result = evaluateExpression(expressionParts);
    const formattedResult = formatNumber(result);

    const formulaStr = expressionParts.map(part => {
        if (['+', '-', '*', '/'].includes(part)) {
            return `${getDisplayOperator(part)}`;
        }
        return formatNumber(part);
    }).join('') + '=';

    document.getElementById('expressionDisplay').textContent = formulaStr;
    document.getElementById('primaryDisplay').textContent = formattedResult;

    currentInput = formattedResult === 'Error' ? '' : formattedResult;
    expressionParts = [];
    justEvaluated = true;
}

function handleBackspace() {
    if (justEvaluated) {
        currentInput = '';
        expressionParts = [];
        justEvaluated = false;
        updateDisplay();
        return;
    }

    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    } else if (expressionParts.length > 0) {
        const popped = expressionParts.pop();

        if (['+', '-', '*', '/'].includes(popped)) {
            currentInput = expressionParts.pop() || '';
        } else {
            currentInput = popped;
        }
        updateDisplay();
    }
}

function handleClear() {
    currentInput = '';
    expressionParts = [];
    justEvaluated = false;
    document.getElementById('expressionDisplay').textContent = '';
    updateDisplay();
}

function handlePercent() {
    if (currentInput !== '') {
        currentInput = (Number(currentInput) / 100).toString();
    } else if (expressionParts.length > 0 && !isNaN(expressionParts[expressionParts.length -1])) {
        const valIndex = expressionParts.length -1;
        expressionParts[valIndex] = (Number(expressionParts[valIndex]) / 100).toString();
    }
    updateDisplay();
}

function simulateButtonPress(selector) {
    const btn = document.querySelector(selector);
        if (btn) {
            btn.classList.add('btn-active-simulated');
            setTimeout(() => {
                btn.classList.remove('btn-active-simulated');
            }, 100);
        } 
    }

    window.addEventListener('keydown', (e) => {
        const keyToPrevent = ['Backspace', 'Enter', '/', '*', '+', '-', '%', '.'];
        if (keyToPrevent.includes(e.key) && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
        }

        if (e.key >= '0' && e.key <= '9') {
            handleDigit(e.key);
            simulateButtonPress(`button[data-val="${e.key}"]`);
        } else if (e.key === '.') {
            handleDigit('.');
            simulateButtonPress('button[data-val="."]');
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            handleOperator(e.key);
            simulateButtonPress(`button[data-val="${e.key}"]`);
        } else if (e.key === '%') {
            handlePercent();
            simulateButtonPress('button[data-action="percent"]');
        } else if (e.key === 'Enter' || e.key === '=') {
            handleEvaluate();
            simulateButtonPress('button[data-action="evaluate"]');
        } else if (e.key === 'Backspace') {
            handleBackspace();
            simulateButtonPress('button[data-action="backspace"]');
        } else if (e.key === 'Escape') {
            handleClear();
            simulateButtonPress('button[data-action="clear"]');
        }  
    });

    document.addEventListener('DOMContentLoaded', () => {
        updateDisplay();

        document.querySelector('.grid').addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if(!btn) return;

            const val = btn.getAttribute('data-val');
            const action = btn.getAttribute('data-action');

            if (val !== null) {
                if (['+', '-', '*', '/'].includes(val)) {
                    handleOperator(val);
                } else {
                    handleDigit(val);
                }
            } else if (action !== null) {
                switch (action) {
                    case 'clear' :
                        handleClear();
                        break;
                    case 'backspace' :
                        handleBackspace();
                        break;
                    case 'percent' :
                        handlePercent();
                        break;
                    case 'evaluate' :
                        handleEvaluate();
                        break;
                }
            }
        });
    });