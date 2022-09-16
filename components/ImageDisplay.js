import {useState, useEffect, useRef} from 'react';
import Selector from './Selector';
import SelectionBox from './SelectionBox';

const ImageDisplay = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [selection, setSelection] = useState(new Array(32).fill(null).map(() => new Array(32).fill("rgb(168,162,159)")));

    const ctxRef = useRef(null);
    const canvasRef = useRef(null);
 
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (props.image) {
            canvas.width = props.image.width;
            canvas.height = props.image.height;
            ctx.drawImage(props.image, 0, 0);
            ctxRef.current = ctx;
            placeBox(new Event('mousedown'), 0, 0);
        } else {
            ctx.fillStyle = "rgb(167,162,159)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        

    }, [props.image])

    const placeBox = (e, xPos = null, yPos = null) => {
        
        
        
        const sideLength = 32 / 2;
        if (props.image) {
            var maxHeight = props.image.height - sideLength * 2;
            var maxWidth = props.image.width - sideLength * 2;
        } else {
            maxHeight = 576 - sideLength * 2;
            maxWidth = 576 - sideLength * 2;
        }

        
        if (xPos === null)
            xPos = e.nativeEvent.offsetX - sideLength;
            
        if (yPos === null)
            yPos = e.nativeEvent.offsetY - sideLength;


        xPos = Math.max(0, xPos)
        xPos = Math.min(maxWidth, xPos)

        yPos = Math.max(0, yPos)
        yPos = Math.min(maxHeight, yPos)

        setX(xPos);
        setY(yPos);
    

        if (props.image) {
            const matrix = new Array(32).fill(null).map(() => new Array(32).fill(""));

            for (let i = 0; i < 32; i++) {
                for (let j = 0; j < 32; j++) {
                    const pixel = ctxRef.current.getImageData(xPos + i, yPos + j, 1, 1).data;
                    matrix[j][i] = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                }
            }
            setSelection(matrix)
        }
        e.stopPropagation();
   }

    return ( 
    <div className = "lg:grid lg:grid-cols-2 lg:gap-2">
        <div className = "mx-auto max-w-full bg-stone-600 p-3 rounded-xl h-fit">
            <div className = "relative overflow-auto w-full h-full mx-auto border border-black cursor-crosshair" 
                draggable = {false}
                onMouseMove={(e) => {if (mouseDown) placeBox(e);}}
                onMouseDown={(e) => {placeBox(e); setMouseDown(true)}}
                onMouseUp = {() => {setMouseDown(false)}}>
                    

                <canvas ref = {canvasRef} style = {{"width": props.image ? props.image.width : 576, "height": props.image ? props.image.height : 576}}/>

                <SelectionBox x = {x} y = {y}/>
            </div>
        </div>

        <Selector selection = {selection} />
        
        
    </div>
    
    )
}

export default ImageDisplay;