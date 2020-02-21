// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const string1 = String(line);

    rl.once('line', line => {
        const string2 = String(line);

        process.stdout.write(String(getEditDistance(string1, string2)));
        process.exit();
    });
});

function getEditDistance(string1, string2) {
    const matrix = [];
    for (let i = 0; i <= string1.length; i += 1) {
        matrix.push([i]);
    }

    for (let i = 1; i <= string2.length; i += 1) {
        matrix[0].push(i);
    }

    const getDistance = (i, j) => {
        const firstValue = matrix[i][j - 1] + 1;
        const secondValue = matrix[i - 1][j] + 1;
        let thirdValue;

        if (string1[i - 1] === string2[j - 1]) {
            thirdValue = matrix[i - 1][j - 1];
        } else {
            thirdValue = matrix[i - 1][j - 1] + 1;
        }

        return [firstValue, secondValue, thirdValue];
    };

    for (let i = 1; i <= string1.length; i += 1) {
        for (let j = 1; j <= string2.length; j += 1) {
            const distance = Math.min(...getDistance(i, j));
            matrix[i][j] = distance;
        }
    }

    return matrix[string1.length][string2.length];
}

module.exports = getEditDistance;
