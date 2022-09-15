import Pixel from './Pixel';

const Selector = (props) => {
    return (
        <div>
            <table>
                <tbody>
                {props.selection.map((row) => 
                    <tr>
                        {row.map((pixel) => <Pixel color = {pixel} />)}
                    </tr>)
                }
                </tbody>
            </table>

            <div>Hello</div>

        </div>
    )
}

export default Selector;