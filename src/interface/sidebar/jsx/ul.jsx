import { 
    faChessBoard, 
    faNewspaper, 
    faPalette, 
    faUser 
} from '@fortawesome/free-solid-svg-icons';
import { 
    FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';
import React from 'react';

export default function UnorderList() {
    return(
        <>
            <ul className='items'>
                <h1><span>Chess.io</span></h1>
                <li>
                <FontAwesomeIcon 
                    icon={faChessBoard}
                    id='icon-one'
                /> 
                <span>Play</span>
                </li>
                <li>
                <FontAwesomeIcon 
                    icon={faUser}
                    id='icon-two'
                /> 
                <span>Social</span>
                </li>
                <li>
                <FontAwesomeIcon 
                    icon={faPalette}
                    id='icon-three'
                /> 
                <span>Theme</span>
                </li>
                <li>
                <FontAwesomeIcon 
                    icon={faNewspaper}
                    id='icon-four'
                /> 
                <span>News</span>
                </li>
            </ul>
        </>
    );
}