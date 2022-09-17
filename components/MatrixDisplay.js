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

    //use for loops over map to splice matrix if necessary since boxSize may be less than the selection size

    if (selectedX >= props.boxSize) {
        var x = props.boxSize - 1;
        setSelectedX(x)
    } else {
        x = selectedX;
    }

    if (selectedY >= props.boxSize) {
        var y = props.boxSize - 1;
        setSelectedY(y)
    } else {
        y = selectedY;
    }

    
    if (props.ctxRef) {

        var matrix = new Array(props.boxSize).fill().map(
            (row, i) =>
                <tr key = {"row" + i}> 
                {
                    new Array(props.boxSize).fill().map(
                        (col, j) => {
                        const pixel = props.ctxRef.current.getImageData(props.canvasMouseX + j, props.canvasMouseY + i, 1, 1).data; //swap i and j to rotate img

                        return <Pixel 
                            color = {`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`} 
                            key = {i + "," + j} 
                            x = {i} 
                            y = {j} 
                            select = {select} 
                            selected = {selectedX === i && selectedY === j}
                            boxSize = {props.boxSize}
                    />})
                }
                
            </tr>
        )
            
    } else {
        matrix = new Array(props.boxSize).fill().map(
            (row, i) => 
                <tr key = {"row" + i}> 
                {
                    new Array(props.boxSize).fill().map(
                        (col, j) => 
                        <Pixel 
                            color = {"rgb(120, 114, 108)"} 
                            key = {i + "," + j} 
                            x = {i} 
                            y = {j} 
                            select = {select} 
                            selected = {selectedX === i && selectedY === j}
                            boxSize = {props.boxSize}
                    />)
                } 
            </tr>
        )
    }



    var rgb = matrix[x].props.children[y].props.color
    var hex = rgbToHex(rgb);
    var textColor = darkOrWhiteText(hex)

   

    console.log(matrix)
    return (
        <div className = "w-full h-full mx-auto p-4">
            
            <div>
                <input type="range" min="1" max="32" step = "1" className = "accent-slate-600" value={props.boxSize} onChange = {(e) => {props.setBoxSize(parseInt(e.target.value))}}/>
                <br/>
                {props.boxSize + " x " + props.boxSize}
            </div>

            <table className='mx-auto cursor-crosshair'>
                
                <tbody>
                    {matrix}
                </tbody>
            </table>

            <p>Click on a pixel to select a color</p>

            <div className = "text-center text-white p-3">
                <input value = {rgb} className = "inline-block p-2 border border-black text-center w-1/3 rounded-xl mx-3 bg-stone-300" style = {{"backgroundColor": rgb, color: textColor}} onClick = {(e) => {e.target.select()}} readOnly = {true} />
                <input value = {hex} className = "inline-block p-2 border border-black text-center w-1/3 rounded-xl mx-3 bg-stone-300" style = {{"backgroundColor": rgb, color: textColor}} onClick = {(e) => {e.target.select()}} readOnly = {true} />
            </div>


        </div>
    )
}

export default MatrixDisplay;