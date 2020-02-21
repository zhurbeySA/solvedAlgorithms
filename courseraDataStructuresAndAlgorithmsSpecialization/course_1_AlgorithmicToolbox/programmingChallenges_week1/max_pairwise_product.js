// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', () => {
    rl.on('line', readLine);
});

function readLine (line) {
    const arr = line.toString().split(' ').map(Number);
    // //Data sets for stress test
    // while (true) {
    //   const randomSet = [];
    //   for (let i = 0; i < Math.ceil(Math.random() * 1000 + 1); i += 1) {
    //     randomSet.push(Math.ceil((Math.random() * 10000))); 
    //   }

    //   if (dumb(randomSet) !== max(randomSet)) {
    //     console.log(`wrong, ${dumb(randomSet)}, ${max(randomSet)}, ${randomSet}`);
    //     break;
    //   } else {
    //     console.log(`OK, dumb: ${dumb(randomSet)}, fast: ${max(randomSet)}`);
    //    }   
    // }

    console.log(max(arr));
    process.exit();
}

function max(arr) {
    let firstMax = 0;
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i] > arr[firstMax]) {
            firstMax = i;
        }
    }

    let secondMax;
    if (firstMax !== 0) {
        secondMax = 0;
    } else {
        secondMax = 1;
    }

    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i] > arr[secondMax] && i !== firstMax) {
            secondMax = i;
      }
    }

    return arr[firstMax] * arr[secondMax];
}

// //Second function for stress test
// function dumb(arr) {
//     let max = 0;
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i] * arr[j] > max) {
//                 max = arr[i] * arr[j];
//             }
//         }
//     }
// 
//     return max;
// }
module.exports = max;
