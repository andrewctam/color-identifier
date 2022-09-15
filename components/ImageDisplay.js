import {useState, useEffect, useRef} from 'react';
import Selector from './Selector';
import SelectionBox from './SelectionBox';

const ImageDisplay = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        if (mouseDown) {
            const sideLength = 20 / 2;

            setX(e.nativeEvent.offsetX - sideLength);
            setY(e.nativeEvent.offsetY - sideLength);
        }

        e.stopPropagation();
    }

    const place = (e) => {
        const sideLength = 20 / 2;

        setX(e.nativeEvent.offsetX - sideLength);
        setY(e.nativeEvent.offsetY - sideLength);

        e.stopPropagation();
    }

   const getMatrix = (e) => {
        const canvas = document.getElementById("canvas");
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(imgRef.current, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            console.log(imageData)
        }
   }

   getMatrix();

    return ( 
    <div className = "lg:grid lg:grid-cols-thirds lg:gap-2">

        <div className = "p-4 bg-stone-600 rounded mx-auto my-auto">
            <div className = "relative" onMouseUp = {() => {setMouseDown(false)}}
                draggable = {false}
                onMouseMove={handleMouseMove}
                onMouseDown={(e) => {place(e); setMouseDown(true)}}>
                    
                <img ref = {imgRef} src={props.image} className="w-full h-full select-none relative pointer-events-none" draggable={false}/>

                <SelectionBox x = {x} y = {y}/>
                <canvas id = "canvas" className='hidden' />


            </div>
        </div>

        <div className = "bg-stone-600 rounded-xl w-full h-96 mx-auto  lg:mt-0 mt-2">
            <Selector selection = {[["blue",'red','red'],['green','yellow','blue']]} />
        </div>
    </div>
    
    )
}

export default ImageDisplay;