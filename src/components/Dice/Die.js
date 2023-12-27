import { useState, useEffect } from 'react';
import dice1 from '../../images/dice-1.svg';
import dice2 from '../../images/dice-2.svg';
import dice3 from '../../images/dice-3.svg';
import dice4 from '../../images/dice-4.svg';
import dice5 from '../../images/dice-5.svg';
import dice6 from '../../images/dice-6.svg';
const Die = ({ number }) => {
    const [numSrc, setNumSrc] = useState(null);
    useState(() => {
        switch (number) {
            case 1: setNumSrc(dice1);
                break;
            case 2: setNumSrc(dice2);
                break;
            case 3: setNumSrc(dice3);
                break;
            case 4: setNumSrc(dice4);
                break;
            case 5: setNumSrc(dice5);
                break;
            case 6: setNumSrc(dice6);
                break;
        }
    }, [number]);
    return (<div>
        <img src={numSrc} alt={"Dice number: " + number} />
    </div>)
}


export { Die };
