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
            canvas.width = Math.min(props.image.width, props.imageBoxRef.current.offsetWidth - 16);
            canvas.height = Math.min(props.image.height, props.imageBoxRef.current.offsetHeight - 16);

            ctx.drawImage(props.image, props.canvasStartX, props.canvasStartY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height); 
    
            const matrix = new Array(32).fill(null).map(() => new Array(32).fill(""));

            for (let i = 0; i < 32; i++) {
                for (let j = 0; j < 32; j++) {
                    const pixel = props.ctxRef.current.getImageData(x + i, y + j, 1, 1).data;
                    matrix[j][i] = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                }
            }
            props.setSelection(matrix)
        

        } else {
            canvas.width = props.imageBoxRef.current.offsetWidth - 16;
            canvas.height = props.imageBoxRef.current.offsetHeight - 16;

            ctx.fillStyle = "rgb(155,186,218)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    useEffect(() => {
        drawCanvas();
    }, [props.image, props.canvasStartX, props.canvasStartY]);
    
    useEffect(() => {
        window.addEventListener('resize', drawCanvas);
        placeBox(new Event('mousedown'), 0, 0);
    }, [])

    const placeBox = (e, xPos = null, yPos = null) => {
        const sideLength = boxSize / 2;

        const maxWidth = props.canvasRef.current.offsetWidth - sideLength * 2;
        const maxHeight = props.canvasRef.current.offsetHeight - sideLength * 2;

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
        <div ref={props.imageBoxRef} className="mx-auto w-96 bg-stone-400 p-2 rounded-xl h-96">
            <div className="relative mx-auto cursor-crosshair w-full h-full border border-black"
                draggable={false}
                onMouseMove={(e) => { if (mouseDown) placeBox(e); }}
                onMouseDown={(e) => { placeBox(e); setMouseDown(true) }}
                onMouseUp={() => { setMouseDown(false) }}>

                <canvas ref={props.canvasRef} />

                <SelectionBox x={x} y={y} width={boxSize} height={boxSize} />
            </div>
        </div>

    )
}

export default ImageCanvas