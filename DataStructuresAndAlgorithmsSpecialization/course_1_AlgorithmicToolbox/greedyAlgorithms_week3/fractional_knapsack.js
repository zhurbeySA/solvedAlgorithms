// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
    const [itemsCount, knapsackCapacity] = line.toString().split(' ').map(Number);
    const values = [];
    const weights = [];
    let count = 0;

    rl.on('line', line => {
        const [v, w] = readLine(line);
        values.push(v);
        weights.push(w);

        if (++count >= itemsCount) {
            console.log(max(itemsCount, knapsackCapacity, values, weights));
            process.exit();
        }
    });
});

function readLine(line) {
    const v = parseInt(line.toString().split(' ')[0], 10);
    const w = parseInt(line.toString().split(' ')[1], 10);

    return [v, w];
}

function max(count, capacity, values, weights) {
    const weightsCopy = [...weights];
    let leftCapacity = capacity;

    const valuePerUnit = values.map((item, index) => {
        return item / weights[index];
    });

    for (let i = 0; i < valuePerUnit.length - 1; i += 1) {
        let maxElement = 0;
        let index;
        for (let j = i; j < valuePerUnit.length; j += 1) {
            if (valuePerUnit[j] > maxElement) {
                maxElement = valuePerUnit[j];
                index = j;
            }
        }
        
        [valuePerUnit[i], valuePerUnit[index]] = [maxElement, valuePerUnit[i]];
        [weightsCopy[i], weightsCopy[index]] = [weightsCopy[index], weightsCopy[i]];
    }

    let maxElementIndex = 0;
    let moneyAmount = 0;
    while (leftCapacity !== 0) {
        if (leftCapacity >= weightsCopy[maxElementIndex]) {
            leftCapacity -= weightsCopy[maxElementIndex];
            moneyAmount += (valuePerUnit[maxElementIndex] * weightsCopy[maxElementIndex]);
            maxElementIndex += 1;
        } else {
            moneyAmount += (leftCapacity * valuePerUnit[maxElementIndex]);
            leftCapacity = 0;
        }
    }
    moneyAmount = moneyAmount.toFixed(4);
    return moneyAmount;
}

module.exports = max;
