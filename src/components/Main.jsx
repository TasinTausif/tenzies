import Die from "./Die"

export default function(){
    return (
        <main>
            <div className="dice-container">
                <Die className="die" value={3}/>
                <Die className="die" value={5}/>
                <Die className="die" value={2}/>
                <Die className="die" value={2}/>
                <Die className="die" value={2}/>
                <Die className="die" value={2}/>
                <Die className="die" value={2}/>
                <Die className="die" value={2}/>
                <Die className="die" value={2}/>
                <Die className="die" value={2}/>
            </div>
        </main>
    )
}