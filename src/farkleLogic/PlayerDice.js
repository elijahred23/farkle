const PlayerDice = {
    dice: [],
    keptDice: [],
    init() {
        this.roll();
    },
    randomDie() {
        return Math.floor(Math.random() * 6) + 1;
    },
    roll() {
        for (let i = 0; i < 6; i++) {
            this.dice[i] = this.randomDie();
        }
    },
    replaceDice(dice) {
        for (let i = 0; i < dice.length; i++) {
            dice[i] = this.randomDie();
        }
        return dice;
    },
    oneOrFive: 0,
    hasThreeOfNum: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    },
    totalCounts: 2000,
    calculateProbability(method, number = null){
        const { keptDice, availableDice } = this.splitKeptAvailabeDice();
        let tempDice = this.replaceDice(availableDice);
        let counter = 0;
        for (let i = 0; i < this.totalCounts; i++) {
            let hasIt = number !== null ? method(number, tempDice) : method(tempDice);
            if (hasIt) {
                counter++;
            }
            tempDice = this.replaceDice(availableDice);
        }
        this.hasThreeOfNum[number] = counter / this.totalCounts;
    },
    hasThree(number, dice = null) {
        const countOfNumber = dice === null ? this.dice.filter(element => element === number).length :
            dice.filter(element => element === number).length;
        return countOfNumber >= 3;
    },
    splitKeptAvailabeDice() {
        keptDice = this.dice.filter((_, index) => this.keptDice.includes(index));
        availableDice = this.dice.filter((_, index) => !this.keptDice.includes(index));
        return { keptDice, availableDice };
    },
    hasOneOrFive(dice = null) {
        return dice === null ? (this.dice.includes(1) || this.dice.includes(5)) :
            (dice.includes(1) || dice.includes(5))
    },
    calculate(){
        for (let number = 1; number <= 6; number++) {
            this.calculateProbability(this.hasThree, number);
        }
    }
}
PlayerDice.init();
module.exports = PlayerDice;