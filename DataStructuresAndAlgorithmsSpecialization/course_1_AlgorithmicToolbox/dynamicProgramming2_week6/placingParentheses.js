// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const expession = String(line);
    process.stdout.write(String(placingParentheses(expession)));
    process.exit();

});

function placingParentheses(expression) {
    const numbers = expression.split('').filter((item, index) => index % 2 === 0);
    const operations = expression.split('').filter((item, index) => index % 2 != 0);
    const minValues = [];
    const maxValues = [];

    for (let i = 0; i < numbers.length; i += 1) {
        minValues.push(new Array(numbers.length).fill(0));
        maxValues.push(new Array(numbers.length).fill(0));
        minValues[i][i] = numbers[i];
        maxValues[i][i] = numbers[i];
    }

    function getMinMax(i, j) {
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;

        for (let k = i; k < j; k += 1) {
            const a = eval(`${maxValues[i][k]} ${operations[k]} ${maxValues[k + 1][j]}`);
            const b = eval(`${minValues[i][k]} ${operations[k]} ${maxValues[k + 1][j]}`);
            const c = eval(`${maxValues[i][k]} ${operations[k]} ${minValues[k + 1][j]}`);
            const d = eval(`${minValues[i][k]} ${operations[k]} ${minValues[k + 1][j]}`);
            min = Math.min(min, a, b, c, d);
            max = Math.max(max, a, b, c, d);
        }

        return [min, max];
    }

    // Go through all possible groups of 2, 3, ... n elements
    for (let s = 1; s < numbers.length; s += 1) {
        for (let i = 0; i < numbers.length - s; i += 1) {
            const j = i + s;
            [minValues[i][j], maxValues[i][j]] = getMinMax(i, j);
        }
    }
    return maxValues[0][numbers.length - 1];
}


module.exports = placingParentheses;
