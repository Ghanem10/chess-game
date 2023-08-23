import React from 'react';
import UnorderList from './jsx/ul';
import Buttons from './jsx/buttons';
import Support from './jsx/support';
import './sideBar.scss';

export default function SideBar() {
    

    return (
        <div className='title'>
            <UnorderList />
            <Buttons />
            <Support />
        </div>
    );
}