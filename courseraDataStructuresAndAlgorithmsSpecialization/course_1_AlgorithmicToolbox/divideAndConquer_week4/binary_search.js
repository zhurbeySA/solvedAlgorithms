// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const arr = line.toString().split(' ').slice(1).map(Number);

    rl.once('line', line => {
        const keys = line.toString().split(' ').slice(1).map(Number);
        const result = [];

        for (let key of keys) {
            result.push(binarySearch(arr, key));
        }

        const res = result.join(' ');
        const maxLength = 50000;

        for (let i = 0; i < res.length; i += maxLength) {
            process.stdout.write(res.slice(i, i + maxLength));
        }

        process.stdout.write('\n');
        process.exit();
    })
});

function binarySearch(arr = [], key) {
    const searchFunc = (i = 0, j = arr.length - 1) => {
        if (i > j) {
            return -1;
        }
        
        let middle = Math.floor(i + (j - i) / 2);
        if (arr[middle] === key) {
            return middle;
        } else if (arr[middle] > key) {
            return searchFunc(0, middle - 1);
        } else {
            return searchFunc(middle + 1, j);
        }
    };

    return searchFunc();
}

module.exports = binarySearch;
