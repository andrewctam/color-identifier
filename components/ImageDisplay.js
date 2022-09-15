import {useEffect, useRef} from 'react';
import Selector from './Selector';

const ImageDisplay = (props) => {
   
    return ( 
    <div className = "lg:grid lg:grid-cols-thirds lg:gap-2">
        <div className = "bg-black">
            
            <img src={props.image} className="mx-auto mt-10 w-1/2" />
        </div>

        <div className = "bg-white rounded-xl w-full h-96 mx-auto">

            <Selector selection = {[["blue",'red','red'],['green','yellow','blue']]} />
        </div>
    </div>
    
    )
}

export default ImageDisplay;