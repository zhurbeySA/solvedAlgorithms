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

        console.log(getFibMod(n, m));
        process.exit();
    }
}

function getFibMod(n, m) {
    const mod = BigInt(m);
    let a = 0n;
    let b = 1n;
    let sequenceLine = ['0', '1'];
    for (let i = 2; i <= 10000; i += 1) {
        [a, b] = [b, a + b];
        sequenceLine.push(String(b % mod));
    }

    let length = 2;
    let period = sequenceLine.slice(0, length).join('');

    while (true) {
        const chunks = [];
        for (let i = 0; i < sequenceLine.length; i += 1) {
            let chunk = sequenceLine[i];
            for (let j = i + 1; j < i + length; j += 1) {
                if (sequenceLine[j] === undefined) {
                    break;
                }
                chunk += sequenceLine[j];
            }
            chunks.push(chunk);
            i += length - 1;
        }

        if (period === chunks[1]) {
            break;
        } else if (length >= (sequenceLine.length / 2) + 1) {
            return 'not solved';
        } else {
            length += 1;
            period = sequenceLine.slice(0, length).join('');
        }
    }
    return sequenceLine[n % length];
}
module.exports = getFibMod;
