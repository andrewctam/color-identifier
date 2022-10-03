import { useState, useEffect } from 'react';
import ColorIdentifier from './ColorIdentifier';


const App = (props) => {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");

    useEffect (() => {
        document.querySelector("body").classList.add("bg-stone-300");

        document.addEventListener('paste', (e) => {
            try {
                if (e.clipboardData && e.clipboardData.files.length > 0) {
                    const file = e.clipboardData.files[0];
                    if (!file['type'].includes("image")) {
                        alert("Invalid file type. Please paste an image");
                        return;
                    }


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
            } catch (error) {
                alert("Error uploading image. Please try again.")
            }
        });

    }, []);

    const uploadImage = (e) => {
        try {
            const file = e.target.files[0];
            if (!file['type'].includes("image")) {
                alert("Invalid file type. Please upload an image");
                return;
            }

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
        } catch (error) {
            alert("Error uploading image. Please try again.");
        }

    }

    return  (
    <div className="text-black mx-auto text-center w-full select-none">
        <div className = "w-full bg-zinc-700 p-10 ">
            <a href = ".">
                <h1 className="text-6xl text-slate-300 font-semibold inline-block">Image Color Identifier</h1>
            </a>

            <p className="text-lg text-white mt-4">Paste an image or upload one below</p>
            <div className="bg-stone-400 max-w-fit mx-auto p-3 rounded-xl" >
                <input className = "w-full" type='file' onInput={uploadImage} accept = {".png, .jpg, .jpeg, .gif, .bmp, .tiff, .webp"} />
            </div>
        </div>

        <ColorIdentifier imageURL = {imageURL} image = {image} />
    </div>)
}

export default App