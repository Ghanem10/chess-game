import React, { useContext } from 'react';
import { LightContext } from '../wraper/props';
import UnorderList from './jsx/ul';
import Buttons from './jsx/buttons';
import Support from './jsx/support';
import './sideBar.scss';

export default function SideBar() {
    const { setLightUI } = useContext(LightContext);

    const switchUI = () => {
        setLightUI((preUI) => !preUI);
    };

    return (
        <div className='title'>
            <UnorderList />
            <Buttons />
            <Support 
              switchUI={switchUI}
            />
        </div>
    );
}