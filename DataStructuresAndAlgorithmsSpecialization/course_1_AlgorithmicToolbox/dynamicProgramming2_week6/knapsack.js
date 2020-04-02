// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const volume = Number(String(line).split(' ')[0]);
    const barsNumber = Number(String(line).split(' ')[1]);

    rl.once('line', line => {
        const bars = String(line).split(' ').slice(0, barsNumber).map((item) => {
            return Number(item);
        });

        process.stdout.write(String(maxKnapsackCapacity(volume, bars)));
        process.exit();
    });
});

function maxKnapsackCapacity(volume, bars) {
    const matrix = [];
    for (let i = 0; i <= bars.length; i += 1) {
        matrix.push([0]);
    }

    for (let i = 1; i <= volume; i += 1) {
        matrix[0].push(0);
    }

    for (let i = 1; i <= bars.length; i += 1) {
        for (let j = 1; j <= volume; j += 1) {
            matrix[i][j] = matrix[i - 1][j];
            if (bars[i - 1] <= j) {
                const possibleValue = matrix[i - 1][j - bars[i - 1]] + bars[i - 1];
                if (matrix[i][j] < possibleValue) {
                    matrix[i][j] = possibleValue;
                }
            }
        }
    }

    return matrix[bars.length][volume];
}

module.exports = maxKnapsackCapacity;
