import React from 'react';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export default function Buttons() {
    
    let navigate = useNavigate();

    function redirectLogin() {
        navigate("/login");
    }

    function redirectRegister() {
        navigate("/register");
    }

    return(
        <>
            <div className='btn-side'>
                <button className='sign-up' onClick={redirectRegister}>Sign up</button>
                <button className='login' onClick={redirectLogin}>Login</button>
                <input className='input-box' placeholder='Search'/>
            </div>
            <div className='options-icon'>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
            <div className='options-container'>
                <div className='options-btn'>
                    <button className='options-signup' onClick={redirectRegister}>Sign up</button>
                    <button className='options-login' onClick={redirectLogin}>Login</button>
                    <input className='options-input-box' placeholder='Search'/>
                </div>
            </div>
        </>
    );
}