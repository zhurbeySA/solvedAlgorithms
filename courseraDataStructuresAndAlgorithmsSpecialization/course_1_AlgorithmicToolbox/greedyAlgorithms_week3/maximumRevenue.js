const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
    const slotsNumber = Number(line);
    let lineNumber = 1;
    let profitForClick;
    let numberOfClicks;

    rl.on('line', line => {
        lineNumber += 1;
        if (lineNumber === 2) {
            profitForClick = String(line).split(' ').slice(0, slotsNumber).map((item) =>  {
                return Number(item);
            });
        }

        if (lineNumber === 3) {
            numberOfClicks = line.toString().split(' ').slice(0, slotsNumber).map((item) => {
                return Number(item);
            });

            console.log(maxRevenue(profitForClick, numberOfClicks));
            process.exit();
        }
    });
});


function maxRevenue(profitForClick, numberOfClicks) {
    let clickProfite = [...profitForClick].sort((a, b) => b - a);
    let clicksNumber = [...numberOfClicks].sort((a, b) => b - a);
    let totalSum = 0;
    
    while ((clickProfite[0] > 0 && clicksNumber[0] > 0)
      || (clickProfite[clickProfite.length - 1] < 0 && clicksNumber[clicksNumber.length - 1] < 0)) {
        if (clickProfite[0] >= clickProfite[clickProfite.length - 1]
          && clickProfite[0] > 0 && clicksNumber[0] > 0) {
            totalSum += clickProfite[0] * clicksNumber[0];
            clickProfite = clickProfite.slice(1);
            clicksNumber = clicksNumber.slice(1);
        } else if (clickProfite[clickProfite.length - 1] < 0
          && clicksNumber[clicksNumber.length - 1] < 0) {
            totalSum += clickProfite[clickProfite.length - 1] * clicksNumber[clicksNumber.length - 1];
            clickProfite = clickProfite.slice(0, -1);
            clicksNumber = clicksNumber.slice(0, -1);
        }
    }

    while (clicksNumber.indexOf(0) !== -1) {;
        if (clickProfite[0] !== 0 && Math.abs(clickProfite[0]) > Math.abs(clickProfite[clickProfite.length - 1])) {
            const zeroIndex = clicksNumber.indexOf(0);
            clickProfite = clickProfite.slice(1);
            clicksNumber.splice(zeroIndex, 1);
        } else {
            const zeroIndex = clicksNumber.indexOf(0);
            clickProfite = clickProfite.slice(0, -1);
            clicksNumber.splice(zeroIndex, 1);
        }
    }

    while (clickProfite.indexOf(0) !== -1) {
        if (clicksNumber[0] !== 0 && Math.abs(clicksNumber[0]) > Math.abs(clicksNumber[clicksNumber.length - 1])) {
            const zeroIndex = clickProfite.indexOf(0);
            clicksNumber = clicksNumber.slice(1);
            // mutation on place
            clickProfite.splice(zeroIndex, 1);
        } else {
            const zeroIndex = clickProfite.indexOf(0);
            clicksNumber = clicksNumber.slice(0, -1);
            clickProfite.splice(zeroIndex, 1);
        }
    }

    while (clickProfite.length !== 0) {
        let clickProfiteMaxIndex = 0;
        let clickProfiteMaxValue = clickProfite[0];;
        for (let i = 1; i < clickProfite.length; ++i) {
            if (Math.abs(clickProfite[i]) > Math.abs(clickProfiteMaxValue)) {
                clickProfiteMaxIndex = i;
                clickProfiteMaxValue = clickProfite[i];
            }
        }

        let clicksNumberMinIndex = 0;
        let clicksNumberMinValue = clicksNumber[0];
        for (let i = 1; i < clicksNumber.length; ++i) {
            if (Math.abs(clicksNumber[i]) > Math.abs(clicksNumberMinValue)) {
                clicksNumberMinIndex = i;
                clicksNumberMinValue = clicksNumber[i];
            }
        }
        
        totalSum += clickProfiteMaxValue * clicksNumberMinValue;
        clickProfite.splice(clickProfiteMaxIndex, 1);
        clicksNumber.splice(clicksNumberMinIndex, 1);
    }

    return totalSum;

module.exports = maxRevenue;
