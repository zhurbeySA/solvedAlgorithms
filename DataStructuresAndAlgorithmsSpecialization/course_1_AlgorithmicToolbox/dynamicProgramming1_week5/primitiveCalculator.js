// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const primitive = Number(line);

    const result = getCalculations(primitive);
    process.stdout.write(`${String(result[0])}\n`);
    process.stdout.write(result[1].join(' '));
    process.exit();
});

function getCalculations(primitive) {
    const calculations = [[0, []]];

    for (let i = 1; i <= primitive; i += 1) {

        if (i === 1) {
            calculations[1] = [0, [1]];
            continue;
        }

        calculations[i] = [Number.MAX_VALUE, []];
        
        if (i / 3 === Math.floor(i / 3)) {
            const currentResult = [calculations[i / 3][0] + 1, [...calculations[i / 3][1], i]];
            if (calculations[i][0] > currentResult[0]) {
                calculations[i] = currentResult;

            }
        }

        if (i / 2 === Math.floor(i / 2)) {
            const currentResult = [calculations[i / 2][0] + 1, [...calculations[i / 2][1], i]];
            if (calculations[i][0] > currentResult[0]) {
                calculations[i] = currentResult;

            }
        }

        const currentResult = [calculations[i - 1][0] + 1, [...calculations[i - 1][1], i]];
        if (calculations[i][0] > currentResult[0]) {
            calculations[i] = currentResult;
        }

        }

    return calculations[primitive];
}

module.exports = getCalculations;
