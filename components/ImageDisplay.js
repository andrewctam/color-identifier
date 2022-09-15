import {useState, useEffect, useRef} from 'react';
import Selector from './Selector';
import SelectionBox from './SelectionBox';
import Image from 'next/image';

const ImageDisplay = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [selection, setSelection] = useState(new Array(24).fill(null).map(() => new Array(24).fill("rgb(0,0,0)")));

    const ctxRef = useRef(null);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = props.image.width;
        canvas.height = props.image.height;

        ctx.drawImage(props.image, 0, 0);

        ctxRef.current = ctx;

        placeBox(new Event('mousedown'), 0, 0);

    }, [props.image])

    const placeBox = (e, xPos = null, yPos = null) => {
        e.stopPropagation();

        const sideLength = 24 / 2;

        if (xPos === null)
            xPos = e.nativeEvent.offsetX - sideLength;
            
        if (xPos < 0)
            xPos = 0;
        else if (xPos > props.image.width - sideLength)
            xPos = props.image.width - sideLength;

        if (yPos === null)
            yPos = e.nativeEvent.offsetY - sideLength;

        if (yPos < 0)
            yPos = 0;
        else if (yPos > props.image.height - sideLength)
            yPos = props.image.height - sideLength;

        setX(xPos);
        setY(yPos);
    
        const matrix = new Array(24).fill(null).map(() => new Array(24).fill(""));

        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 24; j++) {
                const pixel = ctxRef.current.getImageData(xPos + i, yPos + j, 1, 1).data;
                matrix[j][i] = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
            }
        }

        setSelection(matrix)
   }

    return ( 
    <div className = "lg:grid lg:grid-cols-2 lg:gap-2">

        <div className = "p-4 rounded mx-auto my-auto w-full h-96">
            <div id = "imgContainer" className = "relative overflow-auto w-full h-full cursor-crosshair" 
                draggable = {false}
                onMouseMove={(e) => {if (mouseDown) placeBox(e);}}
                onMouseDown={(e) => {placeBox(e); setMouseDown(true)}}
                onMouseUp = {() => {setMouseDown(false)}}>
                    
                <Image 
                    src={props.imageURL} 
                    draggable={false}
                    layout = "fixed"
                    width = {props.image.width}
                    height = {props.image.height}
                    />

                <SelectionBox x = {x} y = {y}/>
            </div>
        </div>

        <div className = "bg-stone-600 rounded-xl w-full h-fit mx-auto  lg:mt-0 mt-2">
            <Selector selection = {selection} />
        </div>
    </div>
    
    )
}

export default ImageDisplay;