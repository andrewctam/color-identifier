import Pixel from './Pixel';
import { useState } from 'react';

const MatrixDisplay = (props) => {
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

    const darkOrWhiteText = (hex) => { //#123456
        var brightness = Math.round((
                    (Number("0x" + hex.substring(1, 3)) * 299) +
                    (Number("0x" + hex.substring(3, 5)) * 587) +
                    (Number("0x" + hex.substring(5)) * 114)) / 1000);
        return (brightness > 125) ? 'black' : 'white';

    }

    if (props.selection) {
        var rgb = props.selection[selectedX][selectedY]
        var hex = rgbToHex(rgb);
        var textColor = darkOrWhiteText(hex)
    } else {
        rgb = "";
        hex = "";
        textColor = "white";
    }

    return (
        <div className = "bg-stone-400 rounded-xl w-full h-full mx-auto lg:mt-0 m-2 p-2">
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

            <div className = "text-center text-white my-3 p-3">
                <input value = {rgb} className = "inline-block p-2 border border-black text-center w-1/3 rounded-xl mx-3 bg-stone-300" style = {{"backgroundColor": props.selection[selectedX][selectedY], color: textColor}} onClick = {(e) => {e.target.select()}} readOnly = {true} />
                <input value = {hex} className = "inline-block p-2 border border-black text-center w-1/3 rounded-xl mx-3 bg-stone-300" style = {{"backgroundColor": props.selection[selectedX][selectedY], color: textColor}} onClick = {(e) => {e.target.select()}} readOnly = {true} />
            </div>
            


        </div>
    )
}

export default MatrixDisplay;