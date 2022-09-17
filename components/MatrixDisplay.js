import Pixel from './Pixel';
import { useState } from 'react';

const MatrixDisplay = (props) => {
    const [selectedX, setSelectedX] = useState(0);
    const [selectedY, setSelectedY] = useState(0);
    const select = (x, y) => {
        setSelectedX(x);
        setSelectedY(y);
    }
    const zoom = (e) => {
        const updated = parseInt(e.target.value)
    
        if (selectedX >= updated) {
            setSelectedX(updated - 1);
        }
        if (selectedY >= updated) {
            setSelectedY(updated - 1);
        }

        props.setBoxSize(updated);
        
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

    const getPixel = (i, j) => {
        if (props.ctxRef)
            var pixel = props.ctxRef.current.getImageData(props.canvasMouseX + j, props.canvasMouseY + i, 1, 1).data; //swap i and j to rotate img
        else
            pixel = [120, 114, 108];

        return <Pixel 
            color = {`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`} 
            key = {i + "," + j} 
            x = {i} 
            y = {j} 
            select = {select} 
            selected = {selectedX === i && selectedY === j}
            boxSize = {props.boxSize} />
    }


    const matrix = new Array(props.boxSize).fill().map( (row, i) =>
        <tr key = {"row" + i}> 
            { new Array(props.boxSize).fill().map( (col, j) =>  getPixel(i, j) ) }
        </tr>
    )

    console.log(matrix)

        
    const rgb = matrix[selectedX].props.children[selectedY].props.color
    const hex = rgbToHex(rgb);
    const textColor = darkOrWhiteText(hex)



    return (
        <div className = "w-full h-full mx-auto p-4">
            <table className='mx-auto cursor-crosshair'>        
                <tbody> {matrix} </tbody>
            </table>

            <p>Click on a pixel to select a color</p>
            <div>
                <p> {props.boxSize + " x " + props.boxSize} </p>
                <input type="range" min="1" max="32" step = "1" className = "accent-slate-600" value={props.boxSize} onChange = {zoom}/>
            </div>
            <div className = "text-center text-white p-3">
                <input value = {rgb} className = "inline-block p-2 border border-black text-center w-5/12 rounded-xl mx-3 bg-stone-300" style = {{"backgroundColor": rgb, color: textColor}} onClick = {(e) => {e.target.select()}} readOnly = {true} />
                <input value = {hex} className = "inline-block p-2 border border-black text-center w-5/12 rounded-xl mx-3 bg-stone-300" style = {{"backgroundColor": rgb, color: textColor}} onClick = {(e) => {e.target.select()}} readOnly = {true} />
            </div>

            
        </div>
    )
}

export default MatrixDisplay;