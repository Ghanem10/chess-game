import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function ButtonNavigation() {

    // TODO, Just check if the user is logged and has a token
    // Simply remove this component - login, and regiter options
    // from the sidebar as well.
    // Additionally, if the user doesn't have a token, then, display
    // there's no data for the profile.
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