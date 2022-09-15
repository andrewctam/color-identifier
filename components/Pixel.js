import { useState } from "react"
const Pixel = (props) => {
    const [hover, setHover] = useState(false)

    return <td className = "w-4 h-4 border border-black m-1" 
            style={{
                "backgroundColor": props.color
            }} onClick = {() => {props.setColorSelected(props.color)}}/>
}

export default Pixel