import { 
    faGithub, 
    faLinkedin, 
    faTwitter 
} from '@fortawesome/free-brands-svg-icons';
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
import { Link } from 'react-router-dom';

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
                <li className='social-list'>
                <FontAwesomeIcon 
                    icon={faUser}
                    id='icon-two'
                /> 
                <span>Social</span>
                </li>
                <ul className='social'>
                    <li>
                        <Link to={'https://www.linkedin.com/in/gani-al'}>
                            <button className='linkedin'>
                                <FontAwesomeIcon id='social-icon' icon={faLinkedin}/>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'https://github.com/gani1000'}>
                            <button className='gitHub'>
                                <FontAwesomeIcon id='social-icon' icon={faGithub}/>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'https://twitter.com/gani10000'}>
                            <button className='twitter'>
                                <FontAwesomeIcon id='social-icon' icon={faTwitter}/>
                            </button>
                        </Link>
                    </li>
                </ul>
                <li className='themes-list'>
                <FontAwesomeIcon 
                    icon={faPalette}
                    id='icon-three'
                /> 
                <span>Theme</span>
                </li>
                <ul className='themes'>
                    <li><img src='./theme1.png' /> <h5>Green & white</h5></li>
                    <li><img src='./theme2.png' /> <h5>Blue & white</h5></li>
                </ul>
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