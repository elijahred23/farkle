import { useState, useEffect } from 'react';
import { Die } from '../Dice/Die';
const PlayerDice = require('../../farkleLogic/PlayerDice');

const FarklePractice = () => {
    const [dice, setDice] = useState([]);

    useEffect(() => {
        setDice(PlayerDice.dice);
    }, []);
    return (<div>
        <h1>Farkle Practice</h1>
        <div style={{display:"flex", justifyContent:"center", }} >
            {dice.map(die => {
                return (<Die number={die} />)
            })}
        </div>
    </div>);
}

export { FarklePractice };