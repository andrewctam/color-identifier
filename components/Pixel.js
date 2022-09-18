import { useState } from "react"
const Pixel = (props) => {
    const [hovered, setHovered] = useState(false)

    return <td 
            onClick = {() => {props.select(props.x, props.y)}} 
            onMouseEnter = {() => {setHovered(true)}} 
            onMouseLeave={() => {setHovered(false)}} 
            className = "m-1" 
            style = {{
                "width": (512 / props.boxSize) + "px",
                "height": (512 / props.boxSize) + "px",
                "backgroundColor": props.color,
                "border": props.selected ? "2px solid rgb(206, 87, 84)" : hovered ? "2px solid black" : "1px solid black",
                "outline": props.selected ? "2px solid rgb(206, 87, 84)" : "none"
            }}
            />
}

export default Pixel