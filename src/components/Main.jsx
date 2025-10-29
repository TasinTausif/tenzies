import Die from "./Die"
import {useState} from "react"
import {nanoid} from "nanoid"

export default function(){
    const [dice, setDice] = useState(generateAllNewDice());

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
            id:nanoid()}));
    }

    function rollDice(){
        setDice(prevData => prevData.map(die => die.isHeld ? die : {...die,
            value: Math.ceil(Math.random() * 6),
        }));
    }

    function hold(id){
        setDice(oldData => oldData.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die));
    }

    const diceElements = dice.map(dieObj => 
        <Die 
            key={dieObj.id}
            value={dieObj.value} 
            isHeld={dieObj.isHeld}
            holdFunc={() => hold(dieObj.id)}
        />);

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
                <button onClick={rollDice} className="roll-dice">Roll</button>
        </main>
    )
}