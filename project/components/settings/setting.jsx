import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import Cookies from 'js-cookie';

import '../../assets/scss/profile&settings/settings.scss';

export default function Setting({ setOpenSettings }) {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const images = document.querySelectorAll("img");

        for (let i = 0; i < images.length; i++) {
            images[i].addEventListener("click", () => {

                if (selectedImage) {
                    selectedImage.style.opacity = '';
                    selectedImage.style.transform = '';
                }

                setSelectedImage(images[i]);
                images[i].style.opacity = 1;
                images[i].style.transform = "scale(0.96)";

                const img = images[i].getAttribute("datatype");
                Cookies.set("color", img);
            });
        }

        return () => {
            for (let i = 0; i < images.length; i++) {
                images[i].removeEventListener("click", () => {});
            }
        };
    }, [selectedImage]);

    return (
        <div className='main-page-settings'>
            <div className='main-page-settings-header'>
                <h2>Settings</h2>
                <button>
                    <Icon.X onClick={() => setOpenSettings(false)} className='icon-x' />
                </button>
            </div>
            <div className='main-page-settings-colors'>
                <h2>Colors:</h2>
                <div className='scroll-image'>
                    <img src="/chess1.png" datatype='brown' />
                    <img src="/chess2.png" datatype='lightskyblue' />
                    <img src="/chess3.png" datatype='black' />
                    <img src="/chess4.png" datatype='purple' />
                    <img src="/chess5.png" datatype='green' />
                    <img src="/chess6.png" datatype='lightgreen' />
                </div>
            </div>
            <div className='main-page-settings-pieces'>
                <span>&lt; Time Coming Soon /&gt;</span>
            </div>
        </div>
    );
}