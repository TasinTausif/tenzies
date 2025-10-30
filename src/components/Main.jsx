import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

import Die from "./Die"

function generateAllNewDice() {
        // const newDice = [];
        // for(let i = 0; i < 10; i++){
        //     const obj = {
        //         value: Math.ceil(Math.random() * 6),
        //         isHeld: false
        //     }
        //     newDice.push(obj);
        // }
        // return newDice;

        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }));
    }


export default function () {
    const { width, height } = useWindowSize()
    const rollButtonRef = useRef(null);

    // While initializing the state, if direct a function is called, it'll execute the function every time the component re-renders
    // To avoid that, we can pass a arrow function that will return the desired value once and will keep the direct values for later
    const [dice, setDice] = useState(() => generateAllNewDice());

    // Whereas array.map returns the direct value, array.every returns a boolean
    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);

    function rollDice() {
        if (gameWon) {
            setDice(() => generateAllNewDice());
        } else {
            setDice(prevData => prevData.map(die => die.isHeld ? die : {
                ...die,
                value: Math.ceil(Math.random() * 6),
            }));
        }
    }

    function hold(id) {
        setDice(oldData => oldData.map(die => die.id === id ? { ...die, isHeld: !die.isHeld } : die));
    }

    const diceElements = dice.map(dieObj =>
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            holdFunc={() => hold(dieObj.id)}
        />);

    useEffect(() => {
        // This will focus the roll button when the game is won.(When a user is playing with keyboard only)
        if (gameWon) {
            rollButtonRef.current.focus();
        }
    }, [gameWon])

    return (
        <main>
            {gameWon && <Confetti
                width={width}
                height={height}
            />}
            {/* This part will show the gameWon message to the screen readers */}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button
                onClick={rollDice}
                className="roll-dice"
                ref={rollButtonRef}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}