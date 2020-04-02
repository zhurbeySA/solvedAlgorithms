// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const arrLength = Number(line);

    rl.once('line', line => {
        const initialArr = line.toString().split(' ').slice(0, arrLength).map(Number);

        process.stdout.write(improvedQuickSort(initialArr).join(' '));
        process.exit();
    })
});

function improvedQuickSort(initialArr, i = 0, j = initialArr.length) {
    if (i >= j) {
        return;
    }

    const random = Math.floor((Math.random() * (j - i))) + i;

    [initialArr[i], initialArr[random]] = [initialArr[random], initialArr[i]];
    const centerPartIndexes = partition(initialArr, i + 1, j);

    improvedQuickSort(initialArr, i, centerPartIndexes[0]);
    improvedQuickSort(initialArr, centerPartIndexes[1] + 1, j);
    return initialArr;

}

function partition (initialArr, start, end) {
    let sameElementsRightBoundry = 0;
    let lessElementsRightBoundry = 0;
    for (let i = start; i < end; i += 1) {
        if (initialArr[i] < initialArr[start - 1]) {
            [initialArr[i], initialArr[start + lessElementsRightBoundry]]
                = [initialArr[start + lessElementsRightBoundry], initialArr[i]];
            lessElementsRightBoundry += 1;
        }

        if (initialArr[start - 1] === initialArr[i]) {
            [initialArr[i], initialArr[start + sameElementsRightBoundry]]
                = [initialArr[start + sameElementsRightBoundry], initialArr[i]];

            if (start + sameElementsRightBoundry === i) {

            } else if (lessElementsRightBoundry - sameElementsRightBoundry === 0) {
                sameElementsRightBoundry += 1;
                lessElementsRightBoundry += 1;

                [initialArr[i], initialArr[start + lessElementsRightBoundry]]
                    = [initialArr[start + lessElementsRightBoundry], initialArr[i]];
            } else {
                [initialArr[i], initialArr[start + lessElementsRightBoundry]]
                    = [initialArr[start + lessElementsRightBoundry], initialArr[i]];
                
                sameElementsRightBoundry += 1;
                lessElementsRightBoundry += 1;
            }
        }
    }

    const sameElementsSubArray = initialArr.slice(start - 1, start + sameElementsRightBoundry);
    initialArr.splice(start + lessElementsRightBoundry, 0, ...sameElementsSubArray);
    initialArr.splice(start - 1, sameElementsRightBoundry + 1);
    return [lessElementsRightBoundry - sameElementsRightBoundry + start - 1,
        start + lessElementsRightBoundry - 1];
}

module.exports = improvedQuickSort;
