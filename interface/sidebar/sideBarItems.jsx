import React from 'react';
import UnorderList from './jsx/ul';
import Buttons from './jsx/buttons';
import Support from './jsx/support';
import { BrowserRouter } from 'react-router-dom';
import './sideBar.scss';

export default function SideBar() {
    

    return (
        <div className='title'>
            <BrowserRouter>
                <UnorderList />
                <Buttons />
                <Support />
            </BrowserRouter>
        </div>
    );
}