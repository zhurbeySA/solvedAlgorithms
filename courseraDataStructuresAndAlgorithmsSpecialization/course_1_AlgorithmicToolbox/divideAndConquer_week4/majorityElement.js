// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const n = Number(line);

    rl.once('line', line => {
        const arr = String(line).split(' ').slice(0, n).map((item) => Number(item));

        const result = majorityElement(arr) === -1 ? 0 : 1;
        console.log(result);
        process.exit();
    })
});

function majorityElement(arr = []) {
    if (arr.length === 0) {
        return -1;
    } else if (arr.length === 1) {
        return arr[0];
    }

    const rightMajority = majorityElement(arr.slice(Math.ceil((arr.length - 0) / 2, arr.length)));
    const leftMajority = majorityElement(arr.slice(0, arr.length - Math.floor((arr.length - 0) / 2)));

    let leftCount = 0;
    if (leftMajority >= 0) {
        for (let i = 0; i < arr.length; i += 1) {
            if (leftMajority === arr[i]) {
                leftCount += 1;
            }
        }
    }

    let rightCount = 0;
    if (rightMajority >= 0) {
        for (let i = 0; i < arr.length; i += 1) {
            if (rightMajority === arr[i]) {
                rightCount += 1;
            }
        }        
    }

    if (leftCount > arr.length / 2) {
        return leftMajority;
    } else if (rightCount > arr.length / 2) {
        return rightMajority;
    }

    return -1;
};

module.exports = majorityElement;
