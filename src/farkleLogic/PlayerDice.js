const PlayerDice = {
    dice: [],
    keptDice: [],
    init() {
        this.roll();
    },
    randomDie() {
        return Math.floor(Math.random() * 6) + 1;
    },
    roll(dice = null) {
        for (let i = 0; i < 6; i++) {
            if(dice === null){
                this.dice[i] = this.randomDie();
            } else {
                dice[i] = this.randomDie();
            }
        }
        if(dice !== null) return dice;
    },
    replaceDice(dice) {
        for (let i = 0; i < dice.length; i++) {
            dice[i] = this.randomDie();
        }
        return dice;
    },
    oneOrFive: 0,
    straight: 0,
    hasThreeOfNum: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    },
    addKeptDice(){

    },
    totalCounts: 2000,
    calculateProbability(method, number = null){
        const { keptDice, availableDice } = this.splitKeptAvailabeDice();
        let tempDice = this.roll(availableDice);
        let counter = 0;
        for (let i = 0; i < this.totalCounts; i++) {
            let hasIt = number !== null ? method(number, tempDice) : method(tempDice);
            if (hasIt) {
                counter++;
            }
            tempDice = this.roll(availableDice);
        }
        let probability = counter / this.totalCounts;
        if(number !== null){
            this.hasThreeOfNum[number] = probability;
        } else {
            switch(method.name){
                case "hasOneOrFive": this.oneOrFive = probability; 
                    break;
                case "hasStraight": this.straight = probability;
                    break;
            }
        }
        return probability;
        
    },
    hasThree(number, dice = null) {
        const countOfNumber = dice === null ? this.dice.filter(element => element === number).length :
            dice.filter(element => element === number).length;
        return countOfNumber >= 3;
    },
    splitKeptAvailabeDice() {
        let keptDice = this.dice.filter((_, index) => this.keptDice.includes(index));
        let availableDice = this.dice.filter((_, index) => !this.keptDice.includes(index));
        return { keptDice, availableDice };
    },
    hasOneOrFive(dice = null) {
        return dice === null ? (this.dice.includes(1) || this.dice.includes(5)) :
            (dice.includes(1) || dice.includes(5))
    },
    hasStraight(dice = null){
        if( dice !== null && dice.length < 6){
            return false;
        } else if (dice === null && this.dice.length < 6){
            return false;
        }
        
        let straightNumbers =  [1,2,3,4,5,6];
        let isStraight = dice === null ? straightNumbers.every(num=>this.dice.includes(num)) : straightNumbers.every(num=>dice.includes(num));
        return isStraight; 
    },
    calculate(){
        for (let number = 1; number <= 6; number++) {
            this.calculateProbability(this.hasThree, number);
        }
        this.calculateProbability(this.hasOneOrFive);
        this.calculateProbability(this.hasStraight);

    },
    decimalToPercent(decimal){
        return (decimal * 100).toFixed(2) + '%';
    },
    printCalculations(){
        console.log('\n***********************************\nProbabilities')
        for(let number = 1; number <= 6; number++){
            console.log(`Three ${number}s ${this.decimalToPercent(this.hasThreeOfNum[number])}`);
        }
        console.log(`Will get one or five: ${this.decimalToPercent(this.oneOrFive)}`)
        console.log(`Will get straight: ${this.decimalToPercent(this.straight)}`)
    }
}
PlayerDice.init();
module.exports = PlayerDice;