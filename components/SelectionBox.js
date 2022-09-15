const SelectionBox = (props) => {

    return (<div className = "absolute w-5 h-5 bg-gray-50/25 outline outline-black pointer-events-none" style = {
        {
            "left": props.x,
            "top": props.y
        }
    }>

    </div>)

}

export default SelectionBox