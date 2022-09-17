import Pixel from './Pixel';
import { useState } from 'react';

const MatrixDisplay = (props) => {
    const [selectedX, setSelectedX] = useState(15);
    const [selectedY, setSelectedY] = useState(15);
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
        <div className = "w-full h-full mx-auto p-4 cursor-crosshair">
            <table className='mx-auto'>
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

            <p>Click on a pixel to select a color</p>

            <div className = "text-center text-white p-3">
                <input value = {rgb} className = "inline-block p-2 border border-black text-center w-1/3 rounded-xl mx-3 bg-stone-300" style = {{"backgroundColor": props.selection[selectedX][selectedY], color: textColor}} onClick = {(e) => {e.target.select()}} readOnly = {true} />
                <input value = {hex} className = "inline-block p-2 border border-black text-center w-1/3 rounded-xl mx-3 bg-stone-300" style = {{"backgroundColor": props.selection[selectedX][selectedY], color: textColor}} onClick = {(e) => {e.target.select()}} readOnly = {true} />
            </div>
            


        </div>
    )
}

export default MatrixDisplay;