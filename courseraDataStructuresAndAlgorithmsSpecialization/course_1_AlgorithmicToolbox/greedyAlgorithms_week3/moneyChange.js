const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(moneyChange(parseInt(line, 10)));
    process.exit();
}

function moneyChange(n) {
    let totalNumber = 0;
    let charge = n;
    while (charge >= 10) {
        charge -= 10;
        totalNumber += 1;
    }

    while (charge >= 5) {
        charge -= 5;
        totalNumber += 1;
    }

    while (charge > 0) {
        charge -= 1;
        totalNumber += 1;
    }

    return totalNumber;
}

module.exports = moneyChange;
