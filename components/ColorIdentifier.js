import {useState, useEffect, useRef} from 'react';
import MatrixDisplay from './MatrixDisplay';
import ImageCanvas from './ImageCanvas';
import CropImage from './CropImage';

const ColorIdentifier = (props) => {
    const [selection, setSelection] = useState(new Array(32).fill(32).map(() => new Array(32).fill("rgb(155, 186, 218)")));

    const [canvasStartX, setCanvasStartX] = useState(0);
    const [canvasStartY, setCanvasStartY] = useState(0);
    
    const imageBoxRef = useRef(null);
    const ctxRef = useRef(null);
    const canvasRef = useRef(null);

    

    return ( 
    <div>
         {imageBoxRef.current && props.image &&
         (props.image.width > canvasRef.current.offsetWith || props.image.height > canvasRef.current.offsetHeight ) ? 
        <CropImage image = {props.image} imageURL = {props.imageURL} setSelection = {setSelection}
            canvasWidth = {canvasRef.current.offsetWidth - 2} 
            canvasHeight = {canvasRef.current.offsetHeight - 2}
            setCanvasStartX = {setCanvasStartX}
            setCanvasStartY = {setCanvasStartY}
         /> : null}



        <div className = "lg:grid lg:grid-cols-2 lg:gap-2">
            <ImageCanvas image = {props.image} setSelection = {setSelection}
                imageBoxRef = {imageBoxRef}
                ctxRef = {ctxRef}
                canvasRef = {canvasRef}

                canvasStartX = {canvasStartX}
                canvasStartY = {canvasStartY}
            />
            <MatrixDisplay selection = {selection} />
        </div>


       
    </div>
    
    )
}

export default ColorIdentifier;