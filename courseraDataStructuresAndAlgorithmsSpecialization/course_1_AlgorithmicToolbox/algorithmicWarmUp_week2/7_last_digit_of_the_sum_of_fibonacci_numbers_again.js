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
        const m = parseInt(line.toString().split(' ')[1], 10);

        console.log(getFibSum(n, m));
        process.exit();
    }
}

function getFibSum(n, m) {
    if (m === 0) {
        return 0;
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

    let lowest;
    if (n === 0) {
        lowest = 0;
    } else {
        lowest = +resultString[(n - 1) % 60];
    }
    
    const highest = +resultString[m % 60];

    if (highest === 0) {
        const result = 10 - lowest === 10 ? 0 : 10 - lowest;
        return result;
    } else if (highest < lowest) {
        return +`1${highest}` - lowest;
    } else {
        return highest - lowest;
    }
}
  
module.exports = getFibSum;
