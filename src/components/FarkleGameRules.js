import React, { useState, useEffect } from 'react';
import rules from '../data/FarkleRules.json';


const FarkleGameRules = () => {
    const [farkleRules, setFarkleRules] = useState({test:"hello"});

    useEffect(() => {
        setFarkleRules(rules);
    }, []);

    return (
        <div>
            {farkleRules && (
                <pre>{JSON.stringify(farkleRules, null, 2)}</pre>
            )}
        </div>
    );
};

export { FarkleGameRules };
