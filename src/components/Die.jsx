export default function(props){
    const btnStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
    }
    return (
            <button 
                style={btnStyle} 
                onClick={props.holdFunc}
                aria-pressed={props.isHeld}
                aria-label={`Die with value ${props.value}. Click to ${props.isHeld ? "unhold" : "hold" }.`}>
                    {props.value}
            </button>
    )
}