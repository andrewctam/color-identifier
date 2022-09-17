import { useState, useEffect, useRef } from 'react';
import SelectionBox from './SelectionBox';

const ImageCanvas = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [boxSize, setBoxSize] = useState(32);

    const drawCanvas = () => {
        const canvas = props.canvasRef.current;
        const ctx = canvas.getContext('2d');
        props.ctxRef.current = ctx;

        if (props.image) {
            canvas.width = Math.min(props.image.width, props.imageBoxRef.current.offsetWidth);
            canvas.height = Math.min(props.image.height, props.imageBoxRef.current.offsetHeight);

            ctx.drawImage(props.image, props.canvasStartX, props.canvasStartY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height); 

            placeBox(new Event('mousedown'), canvas.width / 2 - boxSize / 2 + props.extraX, canvas.height / 2 - boxSize / 2 + props.extraY);            
    
        } else {
            canvas.width = props.imageBoxRef.current.offsetWidth;
            canvas.height = props.imageBoxRef.current.offsetHeight;

            ctx.fillStyle = "rgb(120, 114, 108)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    useEffect(() => {
        drawCanvas();
        //eslint-disable-next-line
    }, [props.image, props.canvasStartX, props.canvasStartY, props.extraX, props.extraY]);
    
    useEffect(() => {
        //window.addEventListener('resize', drawCanvas);
        placeBox(new Event('mousedown'), 0, 0);
        //eslint-disable-next-line
    }, [])

    const placeBox = (e, xPos = null, yPos = null) => {
        const sideLength = boxSize / 2;

        const maxWidth = props.canvasRef.current.offsetWidth - sideLength * 2 - 2;
        const maxHeight = props.canvasRef.current.offsetHeight - sideLength * 2 - 2;

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
                    const pixel = props.ctxRef.current.getImageData(xPos + i, yPos + j, 1, 1).data;
                    matrix[j][i] = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                }
            }
            props.setSelection(matrix)
        }
        e.stopPropagation();
    }

    return (
        <div ref={props.imageBoxRef} className="w-96 h-96">
            <div className="relative cursor-crosshair w-fit h-fit"
                draggable={false}
                onMouseMove={(e) => { if (mouseDown) placeBox(e); }}
                onMouseDown={(e) => { placeBox(e); setMouseDown(true) }}
                onMouseUp={() => { setMouseDown(false) }}>

                <canvas ref={props.canvasRef} className = "m-auto border border-black"/>

                <SelectionBox x={x} y={y} width={boxSize} height={boxSize} />
            </div>

            <p className = "absolute overflow-none break-normal whitespace-nowrap" style ={{
                top: props.canvasRef.current ? props.canvasRef.current.offsetHeight : "386px",
                translate: "-50%",
                left: props.canvasRef.current ? props.canvasRef.current.offsetWidth / 2 : "193px",
            }} >Click or drag to fine tune your selection</p>
        </div>

    )
}

export default ImageCanvas