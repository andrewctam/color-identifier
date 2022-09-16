import { useState, useEffect, useRef } from 'react';
import SelectionBox from './SelectionBox';

const CropImage = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [scale, setScale] = useState(1);
    const imgRef = useRef(null);

    useEffect(() => {
        if (props.image.width > imgRef.current.width) {
            setScale(props.image.width / imgRef.current.width);
        } 
    }, [])

    const placeBox = (e, xPos = null, yPos = null) => {
        if (props.image.width > imgRef.current.width) {
            var scale = props.image.width / imgRef.current.width;
        } else {
            scale = 1;
        }
        setScale(scale)
        
        const maxWidth = imgRef.current.offsetWidth - props.canvasWidth / scale;
        const maxHeight = imgRef.current.offsetHeight - props.canvasHeight / scale;
        if (xPos === null)
            xPos = e.nativeEvent.offsetX - props.canvasWidth / scale / 2;

        if (yPos === null)
            yPos = e.nativeEvent.offsetY - props.canvasHeight / scale / 2;


        xPos = Math.max(0, xPos)
        xPos = Math.min(maxWidth, xPos)

        yPos = Math.max(0, yPos)
        yPos = Math.min(maxHeight, yPos)
        

        console.log(xPos + " " + yPos);

        setX(xPos);
        props.setCanvasStartX(xPos * scale);
        
        setY(yPos);
        props.setCanvasStartY(yPos * scale);
        
        
        e.stopPropagation();
    }

    return (
        <div className="mx-auto mt-5">
            <div className="relative mx-auto cursor-crosshair w-fit h-fit"
                draggable={false}
                onMouseMove={(e) => { if (mouseDown) placeBox(e); }}
                onMouseDown={(e) => { placeBox(e); setMouseDown(true) }}
                onMouseUp={() => { setMouseDown(false) }}>

                <img ref = {imgRef} src={props.imageURL} draggable = {false}/>

                <SelectionBox x={x} y={y} width = {props.canvasWidth / scale} height={props.canvasHeight / scale} />
            </div>
        </div>

    )
}

export default CropImage