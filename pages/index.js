import { useState, useEffect, useRef } from 'react';
import ImageDisplay from '../components/ImageDisplay';

export default function Home() {

    const [image, setImage] = useState(null);

    useEffect (() => {
        document.addEventListener('paste', (e) => {
            if (e.clipboardData && e.clipboardData.files.length > 0) {
                const file = e.clipboardData.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }, []);

   

    const uploadImage = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className={"w-full min-h-screen h-full bg-stone-300 p-10"}>                
            <div className="black text-black mx-auto text-center w-fit p-10 select-none">
                <h1 className="text-5xl">Pixel Color Identifier</h1>
                <p className="text-lg text-gray-700">Paste an image from your clipboard or upload one below</p>

                <div className="w-fit bg-white mx-auto p-3 mt-8 rounded-xl" >
                    <input type='file' onInput={uploadImage} />
                </div>
            </div>

            {image ? 
                <ImageDisplay image = {image} />
            : null}


        </div>
    )
}
