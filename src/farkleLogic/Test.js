const PlayerDice = require("./PlayerDice");



PlayerDice.init();
console.log(PlayerDice.dice);
PlayerDice.calculate();

for(let number = 1; number <= 6; number++){
    console.log(`Three ${number}s ${PlayerDice.hasThreeOfNum[number]}`);
}
