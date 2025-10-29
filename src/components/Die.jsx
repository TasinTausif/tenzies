export default function(props){
    const btnStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
    }
    return (
            <button style={btnStyle} onClick={props.holdFunc}>{props.value}</button>
    )
}