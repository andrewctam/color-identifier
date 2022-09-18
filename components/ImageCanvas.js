import { useState, useEffect } from 'react';
import SelectionBox from './SelectionBox';

const ImageCanvas = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [defaultTop, setDefaultTop] = useState("386px");
    const [defaultLeft, setDefaultLeft] = useState("193px");
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

            ctx.fillStyle = "rgb(120, 114, 108)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

   

    const placeBox = (e, xPos = null, yPos = null) => {
        if (e)
            e.stopPropagation();

        const sideLength = props.boxSize / 2;

        const maxWidth = props.canvasRef.current.offsetWidth - sideLength * 2 - 2; // -2 for border
        const maxHeight = props.canvasRef.current.offsetHeight - sideLength * 2 - 2;

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


    useEffect(() => {
        if (window.innerWidth >= 768) {
            setDefaultTop("386px");
            setDefaultLeft("193px")
        } else {
            setDefaultTop("290px")
            setDefaultLeft("145px")
        }
    }, []);
    

    const handleKeyDown = (e) => {
        if (37 <= e.keyCode && e.keyCode <= 40) {
            e.preventDefault();
        } else {
            return;
        }
        
        switch(e.keyCode){
            case 40: //up
                props.setCanvasMouseY(props.canvasMouseY + 1);
                return;
            case 38: //down
                props.setCanvasMouseY(props.canvasMouseY - 1);
                return;
            case 37: //left
                props.setCanvasMouseX(props.canvasMouseX - 1);
                return;
            case 39: //right
                props.setCanvasMouseX(props.canvasMouseX + 1);
                return;
                
            default: return;
        }

    }
    
    
    return (
        <div ref={props.imageBoxRef} className="md:w-96 md:h-96 w-72 h-72" onKeyDown={handleKeyDown} tabIndex ={1}>
            <div className="relative cursor-crosshair w-fit h-fit touch-none"
                draggable={false}
                onPointerMove={(e) => { if (mouseDown) placeBox(e); }}
                onPointerDown={(e) => { placeBox(e); setMouseDown(true) }}
                onPointerUp={() => { setMouseDown(false) }}>

                <canvas ref={props.canvasRef} className = "m-auto border border-black"/>

                <SelectionBox x={props.canvasMouseX} y={props.canvasMouseY} width={props.boxSize} height={props.boxSize} />
            </div>

            <p className = "absolute overflow-none break-normal whitespace-nowrap" style ={{
                top: props.canvasRef.current ? props.canvasRef.current.offsetHeight : defaultTop,
                translate: "-50%",
                left: props.canvasRef.current ? props.canvasRef.current.offsetWidth / 2 : defaultLeft,
            }} >Click or drag to fine tune your selection</p>
        </div>

    )
}

export default ImageCanvas