const SelectionBox = (props) => {

    return (<div 
                className = "absolute bg-gray-50/25 outline outline-black pointer-events-none" 
                style = {{
                    "width": props.width + "px",
                    "height": props.height + "px",
                    "left": props.x,
                    "top": props.y
                }} 
            />)

}

export default SelectionBox