import {useState, useRef, useEffect} from 'react';
import MatrixDisplay from './MatrixDisplay';
import ImageCanvas from './ImageCanvas';
import CropImage from './CropImage';

const ColorIdentifier = (props) => {
    const [boxSize, setBoxSize] = useState(32);

    //where on the image to draw on the canvas
    const [canvasStartX, setCanvasStartX] = useState(0);
    const [canvasStartY, setCanvasStartY] = useState(0);

    //current mouse position on canvas
    const [canvasMouseX, setCanvasMouseX] = useState(0);
    const [canvasMouseY, setCanvasMouseY] = useState(0);
    
    //offset for the canvas selection box when clicking on extrema mouse positions
    const [extraX, setExtraX] = useState(0);
    const [extraY, setExtraY] = useState(0);

    const imageBoxRef = useRef(null);
    const ctxRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        //reset when a new image is uploaded
        setCanvasStartX(0);
        setCanvasStartY(0);

        setCanvasMouseX(0);
        setCanvasMouseY(0);

        setExtraX(0);
        setExtraY(0);
    }, [props.image]);


    const cropNecessary = canvasRef.current && props.image && 
    (props.image.width > canvasRef.current.offsetWidth || props.image.height > canvasRef.current.offsetHeight);
        

    return ( 
    <div className = "" >
        {cropNecessary ? 
        <CropImage image = {props.image} imageURL = {props.imageURL}
            canvasWidth = {canvasRef.current.offsetWidth - 2} 
            canvasHeight = {canvasRef.current.offsetHeight - 2}
            
            setCanvasStartX = {setCanvasStartX}
            setCanvasStartY = {setCanvasStartY}

            setExtraX = {setExtraX}
            setExtraY = {setExtraY}
         /> : null}


        <div className = "lg:grid lg:grid-cols-2 lg:gap-2">
            <div className = "mx-auto lg:my-auto w-fit h-fit rounded-xl mt-8 mb-6 relative">
                <ImageCanvas 
                    image = {props.image}
                    imageBoxRef = {imageBoxRef}
                    ctxRef = {ctxRef}
                    canvasRef = {canvasRef}

                    canvasStartX = {canvasStartX}
                    canvasStartY = {canvasStartY}

                    setCanvasMouseX = {setCanvasMouseX}
                    setCanvasMouseY = {setCanvasMouseY}
                    
                    canvasMouseX = {canvasMouseX}
                    canvasMouseY = {canvasMouseY}

                    extraX = {extraX}
                    extraY = {extraY}

                    boxSize = {boxSize}
                />

                <div className = "hidden lg:block lg:absolute lg:-top-6 lg:-left-6 -z-10 bg-stone-600" style = {{
                    width: canvasRef.current ? canvasRef.current.offsetWidth : "386px",
                    height: canvasRef.current ? canvasRef.current.offsetHeight : "386px"
                }} />
            </div>

            <MatrixDisplay 
                boxSize = {boxSize} 
                setBoxSize = {setBoxSize} 
                ctxRef = {props.image ? ctxRef : null} 
                canvasMouseX={canvasMouseX} 
                canvasMouseY = {canvasMouseY}
                setCanvasMouseX = {setCanvasMouseX}
                setCanvasMouseY = {setCanvasMouseY}
            />
        </div>


       
    </div>
    
    )
}

export default ColorIdentifier;