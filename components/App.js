import { useState, useEffect, useRef } from 'react';
import ColorIdentifier from './ColorIdentifier';


const App = (props) => {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");


    useEffect (() => {
        document.querySelector("body").classList.add("bg-stone-300");


        document.addEventListener('paste', (e) => {
            if (e.clipboardData && e.clipboardData.files.length > 0) {
                const file = e.clipboardData.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageURL(reader.result);


                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setImage(img);
                }
                };
                reader.readAsDataURL(file);
            }
        });

    }, []);

    const uploadImage = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageURL(reader.result);

            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                setImage(img);
            }

        };
        reader.readAsDataURL(file);


    }

    return  (
    <div className="text-black mx-auto text-center w-fit p-10 select-none">
        <h1 className="text-5xl">Image Color Identifier</h1>

        <p className="text-lg text-gray-700 mt-8">Paste an image, or upload one below</p>
        <div className="w-fit bg-stone-400 mx-auto p-3 mb-8 rounded-xl" >
            <input type='file' onInput={uploadImage} />
        </div>
    
        <ColorIdentifier imageURL = {imageURL} image = {image} />
    </div>)
}

export default App