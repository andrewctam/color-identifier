import Pixel from './Pixel';
import { useState } from 'react';

const Selector = (props) => {
    const [colorSelected, setColorSelected] = useState("rgb(0, 0, 0)");
    const [selected, setSelected] = useState("");

    return (
        <div>
            <table className='mx-auto mt-3'>
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
                            setColorSelected = {setColorSelected} 
                        />
                        )}
                    </tr>)
                : null}
                </tbody>
            </table>

            <div className = "text-center text-xl " style = {{"backgroundColor": colorSelected}}>
                {colorSelected}
            </div>

        </div>
    )
}

export default Selector;