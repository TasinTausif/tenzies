import Die from "./Die"
import {useState} from "react"
import {nanoid} from "nanoid"

export default function(){

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
        setDice(generateAllNewDice());
    }

    const [dice, setDice] = useState(generateAllNewDice());
    const diceElements = dice.map(dieObj => 
        <Die 
            key={dieObj.id} 
            value={dieObj.value} 
            isHeld={dieObj.isHeld} />);

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
                <button onClick={rollDice} className="roll-dice">Roll</button>
        </main>
    )
}