import { useState, useEffect } from 'react';
import SelectionBox from './SelectionBox';

const ImageCanvas = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    //most state is moved to ColorIdentifier since it needs to be accessed in the MatrixDisplay and CropImage

    useEffect(() => {
        drawCanvas();
        //eslint-disable-next-line
    }, [props.image, props.canvasStartX, props.canvasStartY, props.extraX, props.extraY]);

    const drawCanvas = () => {
        const canvas = props.canvasRef.current;
        const ctx = canvas.getContext('2d');
        props.ctxRef.current = ctx;

        if (props.image) {
            canvas.width = Math.min(props.image.width, props.imageBoxRef.current.offsetWidth);
            canvas.height = Math.min(props.image.height, props.imageBoxRef.current.offsetHeight); 

            props.setCanvasWidth(canvas.width)
            props.setCanvasHeight(canvas.height)

            //draw cropped image (or full image if smaller than canvas)
            ctx.drawImage(props.image, props.canvasStartX, props.canvasStartY, 
                    canvas.width, canvas.height, 0, 0, canvas.width, canvas.height); 

            //draw selection box at middle, with offset when extrema crop selected
            placeBox(null,
                    canvas.width / 2 - props.boxSize / 2 + props.extraX,
                    canvas.height / 2 - props.boxSize / 2 + props.extraY);            
    
        } else {
            //default blank canvas when no image
            canvas.width = props.imageBoxRef.current.offsetWidth;
            canvas.height = props.imageBoxRef.current.offsetHeight;

            props.setCanvasWidth(canvas.width)
            props.setCanvasHeight(canvas.height)

            ctx.fillStyle = "rgb(120, 114, 108)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        }
    }


    const placeBox = (e, xPos = null, yPos = null) => {
        if (e)
            e.stopPropagation();

        const sideLength = props.boxSize / 2;

        const maxWidth = props.canvasWidth - sideLength * 2;
        const maxHeight = props.canvasHeight - sideLength * 2;

        if (xPos === null)
            xPos = e.nativeEvent.offsetX - sideLength;

        if (yPos === null)
            yPos = e.nativeEvent.offsetY - sideLength;

        xPos = Math.max(0, xPos)
        xPos = Math.min(maxWidth, xPos)

        yPos = Math.max(0, yPos)
        yPos = Math.min(maxHeight, yPos)

        props.setCanvasMouseX(xPos);
        props.setCanvasMouseY(yPos);
    }


    const handleKeyDown = (e) => {
        if (37 <= e.keyCode && e.keyCode <= 40) {
            e.preventDefault();
        } else {
            return;
        }
        
        switch(e.keyCode) {
            case 40: //up
                placeBox(null, props.canvasMouseX, props.canvasMouseY + 1);
                return;
            case 38: //down
                placeBox(null, props.canvasMouseX, props.canvasMouseY - 1);
            return;
            case 37: //left
                placeBox(null, props.canvasMouseX - 1, props.canvasMouseY);
            return;
            case 39: //right
                placeBox(null, props.canvasMouseX + 1, props.canvasMouseY);
                return;
                
            default: return;
        }

    }
    
    
    return (
        <div ref={props.imageBoxRef} className="md:w-96 md:h-96 w-72 h-72"  >
            <div className="relative cursor-crosshair w-fit h-fit touch-none"
                draggable={false}
                onPointerMove={(e) => { if (mouseDown) placeBox(e); }}
                onPointerDown={(e) => { placeBox(e); setMouseDown(true) }}
                onPointerUp={() => { setMouseDown(false) }}>

                <canvas ref={props.canvasRef} className = "m-auto border border-black" onKeyDown={handleKeyDown} tabIndex ={1}/>

                <SelectionBox x={props.canvasMouseX} y={props.canvasMouseY} width={props.boxSize} height={props.boxSize} />
            </div>

            <p className = "absolute overflow-none break-normal whitespace-nowrap" style = {{
                    top: props.canvasHeight,
                    left: props.canvasWidth / 2,
                    translate: "-50%",
                }}> 
                Click or drag to fine tune your selection
            </p>
        </div>

    )
}

export default ImageCanvas