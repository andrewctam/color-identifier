import {useState, useEffect, useRef} from 'react';
import Selector from './Selector';
import SelectionBox from './SelectionBox';

const ImageDisplay = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [selection, setSelection] = useState(new Array(32).fill(null).map(() => new Array(32).fill("rgb(0,0,0)")));

    const ctxRef = useRef(null);
    const canvasRef = useRef(null);
 
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = props.image.width;
        canvas.height = props.image.height;
        ctx.drawImage(props.image, 0, 0);
        ctxRef.current = ctx;
        
        placeBox(new Event('mousedown'), 0, 0);

    }, [props.image])

    const placeBox = (e, xPos = null, yPos = null) => {
        const sideLength = 32 / 2;

        if (xPos === null)
            xPos = e.nativeEvent.offsetX - sideLength;
            
        if (xPos < 0)
            xPos = 0;
        else if (xPos > props.image.width - sideLength * 2)
            xPos = props.image.width - sideLength * 2;

        if (yPos === null)
            yPos = e.nativeEvent.offsetY - sideLength;

        if (yPos < 0)
            yPos = 0;
        else if (yPos > props.image.height - sideLength * 2)
            yPos = props.image.height - sideLength * 2;

        setX(xPos);
        setY(yPos);
    

        var current = Date.now();
        const matrix = new Array(32).fill(null).map(() => new Array(32).fill(""));

        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 32; j++) {
                const pixel = ctxRef.current.getImageData(xPos + i, yPos + j, 1, 1).data;
                matrix[j][i] = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
            }
        }
        setSelection(matrix)
        console.log(Date.now() - current)

        e.stopPropagation();
   }

    return ( 
    <div className = "lg:grid lg:grid-cols-2 lg:gap-2">
        <div className = "mx-auto my-auto w-full bg-stone-400 p-3 rounded">
            <div id = "imgContainer" className = "relative overflow-scroll w-full h-full cursor-crosshair" 
                draggable = {false}
                onMouseMove={(e) => {if (mouseDown) placeBox(e);}}
                onMouseDown={(e) => {placeBox(e); setMouseDown(true)}}
                onMouseUp = {() => {setMouseDown(false)}}>
                    

                <canvas ref = {canvasRef} style = {{"width":props.image.width, "height":props.image.height}}/>

                <SelectionBox x = {x} y = {y}/>
            </div>
        </div>

            <Selector selection = {selection} />
        
        
    </div>
    
    )
}

export default ImageDisplay;