import { useState, useEffect } from 'react';
import { Die } from '../Dice/Die';
import GameDice from '../../farkleLogic/PlayerDice';

const FarklePractice = () => {
    const [dice, setDice] = useState([]);
    const [showProbabilities, setShowProbabilities] = useState(false);
    const [keyDiceIndexes, setKeyDiceIndexes] = useState([]);

    const calculate = () => {
        GameDice.calculate();
    }
    const decimalToPercent = (decimal) => {
        return (decimal * 100).toFixed(2) + '%';
    }
    const clearKeyDiceIndexes = () => {
        calculate();
        setKeyDiceIndexes([]);
    }
    const appendKeyDiceIndexes = (index) => {
        calculate();
        
        setKeyDiceIndexes(prev => [...prev, index]);
    }
    const removeKeyDiceIndex = (numberToRemove) => {
        setKeyDiceIndexes((prev) => prev.filter((num) => {
            return num != numberToRemove;
        }));
    }

    useEffect(() => {
        setDice(GameDice.dice);
        calculate();
        setShowProbabilities(true);
    }, []);

    return (<div>
        <h1>Farkle Practice</h1>
        <div style={{ display: "flex", justifyContent: "center", }} >
            {dice.map((die, index) => {
                let isKeptDie = keyDiceIndexes.includes(index);

                return (<div style={{ border: isKeptDie ? "1px solid red" : "none" }} onClick={() => {
                    if (keyDiceIndexes.includes(index)) {
                        removeKeyDiceIndex(index);
                    } else {
                        appendKeyDiceIndexes(index);
                    }
                }}>
                    <Die number={die} />
                </div>)
            })}
        </div>
        {keyDiceIndexes.length > 0 && <div>
            <button onClick={clearKeyDiceIndexes}>Clear Index</button>
        </div>}
        {showProbabilities && <div>
            <h2>Probabilities</h2>
            {[1, 2, 3, 4, 5, 6].map(num => {
                let hasThreePercent = GameDice.hasThreeOfNum[num];
                return (<>
                    <div>Three {num}s: {decimalToPercent(hasThreePercent)}</div>
                </>);
            })}
            <div>Straight: {GameDice.straight}</div>
            <div>One or Five: {GameDice.oneOrFive}</div>
        </div>}

    </div>);
}

export { FarklePractice };