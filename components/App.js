import { useState, useEffect, useRef } from 'react';
import ColorIdentifier from './ColorIdentifier';


const App = (props) => {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");
  

    useEffect (() => {
        document.querySelector("body").classList.add("bg-stone-400");


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
    <div className="text-black mx-auto text-center w-full select-none">
        <div className = "w-full bg-stone-500 p-10 ">
            <a href = ".">
                <h1 className="text-6xl text-slate-300 font-semibold inline-block">Image&nbsp;</h1>
                <h1 className="text-6xl text-slate-200 font-semibold inline-block">Color&nbsp;</h1>
                <h1 className="text-6xl text-zinc-200 font-semibold inline-block"> Identifier&nbsp;</h1>
            </a>

            <p className="text-lg text-white mt-8">Paste an image or upload one below</p>
            <div className="bg-stone-400 max-w-fit mx-auto p-3 mb-8 rounded-xl" >
                <input type='file' onInput={uploadImage} />
            </div>
        </div>

        <ColorIdentifier imageURL = {imageURL} image = {image} />
    </div>)
}

export default App