import { useState } from "react"
const Pixel = (props) => {
    const [hovered, setHovered] = useState(false)

    const style = {
        "width": (32 * 16 / props.boxSize) + "px",
        "height": (32 * 16 / props.boxSize) + "px",
        "backgroundColor": props.color,
        "border": props.selected ? "2px solid rgb(206, 87, 84)" : hovered ? "2px solid black" : "1px solid black",
        "outline": props.selected ? "2px solid rgb(206, 87, 84)" : "none"
    }

    return <td className = "m-1" style={style} onClick = {() => {props.select(props.x, props.y)}} 
    onMouseEnter = {() => {setHovered(true)}} onMouseLeave={() => {setHovered(false)}} />
}

export default Pixel