import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function ButtonNavigation() {
    function profilePage() {
        window.location.href = '/profile';
    }

    return (
        <div className='navigate'>
            <button className='btn-profile' onClick={profilePage}>
                <FontAwesomeIcon id='icon'  icon={faHome} />
            </button>
        </div>
    );
}