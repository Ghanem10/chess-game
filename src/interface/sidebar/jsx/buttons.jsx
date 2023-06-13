import React from 'react';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Buttons() {
    return(
        <>
            <div className='btn-side'>
                <button className='sign-up'>Sign up</button>
                <button className='login'>Login</button>
                <input className='input-box' placeholder='Search'/>
            </div>
            <div className='options-icon'>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
            <div className='options-container'>
                <div className='options-btn'>
                    <button className='options-signup'>Sign up</button>
                    <button className='options-login'>Login</button>
                    <input className='options-input-box' placeholder='Search'/>
                </div>
            </div>
        </>
    );
}