const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(fib(parseInt(line, 10)));
    process.exit();
}

function fib(n) {
    const arr = [0, 1];
    if (!arr[n]) {
        for (let i = 2; i <= n; i++) {
            arr.push(+String(arr[i - 1] + arr[i - 2]).slice(-1));
        }
        return arr[n];
    } else {
        return arr[n];
    }
}

module.exports = fib;
