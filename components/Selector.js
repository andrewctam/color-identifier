import Pixel from './Pixel';
import { useState } from 'react';

const Selector = (props) => {
    const [selectedX, setSelectedX] = useState(0);
    const [selectedY, setSelectedY] = useState(0);
    const select = (x, y) => {
        setSelectedX(x);
        setSelectedY(y);
        
    }

    const toHex = (str) => {
        const hex = parseInt(str).toString(16)
        return hex.length === 1 ? "0" + hex : hex;
    }
    const rgbToHex = (str)  => {
        const rgb = str.replace(/[^\d,]/g, '').split(',');
        return "#" + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2]);
    }

    if (props.selection) {
        var rgb = props.selection[selectedX][selectedY]
        var hex = rgbToHex(rgb);
    } else {
        rgb = "";
        hex = "";

    }
    return (
        <div className = "bg-stone-600 rounded-xl w-full h-fit mx-auto lg:mt-0 mt-2">
            <p className = "text-center text-xl text-white my-3">Click on a pixel below to select a color</p>
            <table className='mx-auto' >
                <tbody>
                {props.selection ? 
                    props.selection.map((row, i) => 
                    <tr key = {"row" + i}>
                        {row.map((pixel, j) => 
                        <Pixel 
                            color = {pixel} 
                            key = {i + "," + j} 
                            x = {i} 
                            y = {j} 
                            select = {select} 
                            selected = {selectedX === i && selectedY === j}
                        />
                        )}
                    </tr>)
                : null}
                </tbody>
            </table>

            <div className = "text-center text-xl text-white my-3 p-3">
                <input readOnly = {true} className = "inline-block p-5 border border-black text-black text-center w-1/3 rounded-xl mx-3 bg-stone-300" value = {rgb} onClick = {(e) => {e.target.select()}}/>
                <div className = "inline-block w-6 h-6 rounded-2xl mx-auto border border-black" style = {{"backgroundColor": props.selection[selectedX][selectedY]}} />
                <input readOnly = {true} className = "inline-block p-5 border border-black text-black text-center w-1/3 rounded-xl mx-3 bg-stone-300" value = {hex} onClick = {(e) => {e.target.select()}}/>
            </div>
            


        </div>
    )
}

export default Selector;