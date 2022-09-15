import {useState, useEffect, useRef} from 'react';
import Selector from './Selector';
import SelectionBox from './SelectionBox';
import Image from 'next/image';

const ImageDisplay = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [selection, setSelection] = useState([]);

    const ctxRef = useRef(null);
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = props.image.width;
        canvas.height = props.image.height;

        ctx.drawImage(props.image, 0, 0);

        ctxRef.current = ctx;
    }, [props.image])

    const placeBox = (e) => {
        e.stopPropagation();

        const sideLength = 24 / 2;

        const x = e.nativeEvent.offsetX - sideLength;
        if (x < 0)
            x = 0;
        else if (x > props.image.width - sideLength)
            x = props.image.width - sideLength;

        const y = e.nativeEvent.offsetY - sideLength;

        if (y < 0)
            y = 0;
        else if (y > props.image.height - sideLength)
            y = props.image.height - sideLength;

        setX(x);
        setY(y);

    
        const matrix = new Array(24).fill(null).map(() => new Array(24).fill(""));

        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 24; j++) {
                const pixel = ctxRef.current.getImageData(x + i, y + j, 1, 1).data;
                matrix[j][i] = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
            }
        }

        setSelection(matrix)
   }

    return ( 
    <div className = "lg:grid lg:grid-cols-2 lg:gap-2">

        <div className = "p-4 bg-stone-600 rounded mx-auto my-auto w-full h-96">
            <div id = "imgContainer" className = "relative overflow-scroll w-full h-full cursor-crosshair" 
                draggable = {false}
                onMouseMove={(e) => {if (mouseDown) placeBox(e);}}
                onMouseDown={(e) => {placeBox(e); setMouseDown(true)}}
                onMouseUp = {() => {setMouseDown(false)}}>
                    
                <Image 
                    src={props.imageURL} 
                    draggable={false}
                    layout = "fixed"
                    width = {props.image.width}
                    height = {props.image.height}
                    />

                <SelectionBox x = {x} y = {y}/>
            </div>
        </div>

        <div className = "bg-stone-600 rounded-xl w-full h-fit mx-auto  lg:mt-0 mt-2">
            <Selector selection = {selection} />
        </div>
    </div>
    
    )
}

export default ImageDisplay;