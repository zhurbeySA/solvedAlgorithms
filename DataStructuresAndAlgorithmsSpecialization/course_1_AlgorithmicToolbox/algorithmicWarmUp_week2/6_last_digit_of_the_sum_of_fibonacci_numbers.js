const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    if (line !== "\n") {
        const n = parseInt(line.toString().split(' ')[0], 10);

        console.log(getFibSum(n));
        process.exit();
    }
}

function getFibSum(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }
    let a = 0n;
    let b = 1n;
    let sum = 1n;
    let resultString = ['0', '1'];
    const periodLength = 60;
    for (let i = 2; i < periodLength; i += 1) {
        [a, b] = [b, a + b];
        sum = +String(sum + b).slice(-1);
        resultString.push(`${sum}`);
        sum = BigInt(sum);
    }
    return resultString[n % 60];
}

module.exports = getFibSum;
