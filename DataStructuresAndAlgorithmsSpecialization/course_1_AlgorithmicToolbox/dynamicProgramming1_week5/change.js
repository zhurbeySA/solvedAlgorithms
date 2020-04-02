// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const change = Number(line);

    process.stdout.write(String(getChange(change, [1, 3, 4])));
    process.exit();
});

function getChange(change, denominations) {
    const minChangeAmount = [0];

    for (let i = 1; i <= change; i += 1) {
        minChangeAmount[i] = Number.MAX_VALUE;
        for (let j = 0; j < denominations.length; j += 1) {
            if (i >= denominations[j]) {
                const currentResult = minChangeAmount[i - denominations[j]] + 1;
                minChangeAmount[i] = currentResult < minChangeAmount[i] ? currentResult : minChangeAmount[i];
            }
        }
    }

    return minChangeAmount[change];
}

module.exports = getChange;
