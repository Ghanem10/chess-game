import React from 'react';
import { 
    faGear, 
    faSun,
    faCircleQuestion
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Support({ switchUI }) {
    return(
        <div className='icons-support'>
            <ul className='support'>
                <li onClick={switchUI}>
                    <FontAwesomeIcon icon={faSun} /> 
                    <span>Light UI</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faGear} /> 
                    <span>Setting</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faCircleQuestion} /> 
                    <span>Help</span>
                </li>
            </ul>
        </div>
    );
}