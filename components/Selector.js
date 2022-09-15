import Pixel from './Pixel';
import { useState } from 'react';

const Selector = (props) => {
    const [selectedX, setSelectedX] = useState(0);
    const [selectedY, setSelectedY] = useState(0);
    const select = (x, y) => {
        setSelectedX(x);
        setSelectedY(y);
        
    }

    return (
        <div>
            <p className = "text-center text-xl text-white my-3">Click on a pixel below to select it</p>
            <table className='mx-auto'>
                <tbody>
                {props.selection ? 
                    props.selection.map((row, i) => 
                    <tr key = {"row" + i}>
                        {row.map((pixel, j) => 
                        <Pixel 
                            color = {pixel} 
                            key = {i + "," + j} 
                            x = {i} 
                            y = {j} 
                            select = {select} 
                            selected = {selectedX === i && selectedY === j}
                        />
                        )}
                    </tr>)
                : null}
                </tbody>
            </table>

            <div className = "text-center text-xl text-white my-3"> {
                props.selection ?
                    props.selection[selectedX][selectedY]
                : "Select a Pixel"
            }
            </div>

        </div>
    )
}

export default Selector;