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
    let a = 0n;
    let b = 1n;
    let sum = 1;
    let resultString = ['0', '1'];
    for (let i = 2; i < 30; i += 1) {
        [a, b] = [b, a + b];
        sum = +String(sum + Math.pow(+String(b).slice(-1), 2)).slice(-1);
        resultString.push(String(sum));
    }

    const firstPart = resultString.slice(0, 15).join('');
    const secondPart = resultString.slice(15, 30).join('');
    
    const numberOfLastDigit = BigInt(n) % BigInt(15);
    const sequenceNumber = BigInt(n) / BigInt(15);

    if (sequenceNumber % 2n === 0n) {
        return firstPart[Number(numberOfLastDigit)];
    } else {
        return secondPart[Number(numberOfLastDigit)];
    }

    // // Period length determine algorithm
    // let length = 2;
    // let period = '01';

    // while (true) {
    //     const chunks = [];
    //     for (let i = 0; i < resultString.length; i += 1) {
    //         let chunk = resultString[i];
    //         for (let j = i + 1; j < i + length; j += 1) {
    //             if (resultString[j] === undefined) {
    //                 break;
    //             }
    //             chunk += resultString[j];
    //         }
    //         chunks.push(chunk);
    //         console.log(chunks);
    //         i += length - 1;
    //     }

    //     if (period === chunks[1] || period === chunks[2]) {
    //         break;
    //     } else if (length >= (resultString.length / 2) + 1) {
    //         return 'not solved';
    //     } else {
    //         length += 1;
    //         period = resultString.slice(0, length).join('');
    //     }
    // }
    // console.log(length);
}
  
module.exports = getFibSum;
