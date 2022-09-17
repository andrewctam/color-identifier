import {useState, useEffect, useRef} from 'react';
import MatrixDisplay from './MatrixDisplay';
import ImageCanvas from './ImageCanvas';
import CropImage from './CropImage';

const ColorIdentifier = (props) => {
    const [selection, setSelection] = useState(new Array(32).fill(32).map(() => new Array(32).fill("rgb(120, 114, 108)")));

    const [canvasStartX, setCanvasStartX] = useState(0);
    const [canvasStartY, setCanvasStartY] = useState(0);
    
    const [extraX, setExtraX] = useState(0);
    const [extraY, setExtraY] = useState(0);

    const imageBoxRef = useRef(null);
    const ctxRef = useRef(null);
    const canvasRef = useRef(null);

    
    const cropNecessary = imageBoxRef.current && 
                    props.image &&
                        (props.image.width > canvasRef.current.offsetWith || 
                        props.image.height > canvasRef.current.offsetHeight);
    return ( 
    <div className = "">
        {cropNecessary ? 
        <CropImage image = {props.image} imageURL = {props.imageURL} setSelection = {setSelection}
            canvasWidth = {canvasRef.current.offsetWidth - 2} 
            canvasHeight = {canvasRef.current.offsetHeight - 2}
            setCanvasStartX = {setCanvasStartX}
            setCanvasStartY = {setCanvasStartY}

            setExtraX = {setExtraX}
            setExtraY = {setExtraY}
         /> : null}


        <div className = "lg:grid lg:grid-cols-2 lg:gap-2">
            <div className = "mx-auto lg:my-auto w-fit h-fit rounded-xl mt-8 mb-6 relative">
                <ImageCanvas image = {props.image} setSelection = {setSelection}
                    imageBoxRef = {imageBoxRef}
                    ctxRef = {ctxRef}
                    canvasRef = {canvasRef}

                    canvasStartX = {canvasStartX}
                    canvasStartY = {canvasStartY}

                    extraX = {extraX}
                    extraY = {extraY}
                />

                <div className = "hidden lg:block lg:absolute lg:-top-6 lg:-left-6 -z-10 bg-stone-600" style = {{
                    width: canvasRef.current ? canvasRef.current.offsetWidth : "368px",
                    height: canvasRef.current ? canvasRef.current.offsetHeight : "368px"
                }}></div>
            </div>

            <MatrixDisplay selection = {selection} />
        </div>


       
    </div>
    
    )
}

export default ColorIdentifier;