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
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LightContext } from '../../wraper/props';

export default function UnorderList() {
    const { setBoardColor } = useContext(LightContext);
    function getValue(num) {
        setBoardColor(num);
    }
    return(
        <>
            <ul className='items'>
                <h1><span>Chess.io</span></h1>
                <li className='play-list one'>
                <FontAwesomeIcon 
                    icon={faChessBoard}
                    id='icon-one'
                /> 
                <span>Play</span>
                </li>
                <li className='social-list one'>
                <FontAwesomeIcon 
                    icon={faUser}
                    id='icon-two'
                /> 
                <span>Social</span>
                </li>
                <ul className='social'>
                    <li>
                        <button className='linkedin'>
                            <Link to={'https://www.linkedin.com/in/gani-al'}>
                                    <FontAwesomeIcon id='social-icon-linkedin' icon={faLinkedin}/> <span id='social-links'>LinkedIn</span>
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button className='gitHub'>
                            <Link to={'https://github.com/gani1000'}>
                                    <FontAwesomeIcon id='social-icon-github' icon={faGithub}/> <span id='social-links'>GitHub</span>
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button className='twitter'>
                            <Link to={'https://twitter.com/gani10000'}>
                                    <FontAwesomeIcon id='social-icon-twitter' icon={faTwitter}/> <span id='social-links'>Twitter</span>
                            </Link>
                        </button>
                    </li>
                </ul>
                <li className='themes-list one'>
                <FontAwesomeIcon 
                    icon={faPalette}
                    id='icon-three'
                /> 
                <span>Theme</span>
                </li>
                <ul className='themes'>
                    <li onClick={() => getValue(1)}><img src='./theme1.png' /> <h5>Green & white</h5></li>
                    <li onClick={() => getValue(2)}><img src='./theme2.png' /> <h5>Blue & white</h5></li>
                    <li onClick={() => getValue(4)}><img src='./theme3.png' /> <h5>Brown & white</h5></li>
                    <li onClick={() => getValue(5)}><img src='./theme4.png' /> <h5>Purple & white</h5></li>
                    <li onClick={() => getValue(6)}><img src='./theme5.png' /> <h5>Black & white</h5></li>
                    <li onClick={() => getValue(3)}><img src='./theme1.png' /> <h5>Original</h5></li>
                </ul>
                <li className='news-list one'>
                <FontAwesomeIcon 
                    icon={faNewspaper}
                    id='icon-four'
                /> 
                <span>News</span>
                </li>
                <ul className='news'>
                    <li>
                        <img src='./news.png'/>
                        <Link to={'https://www.chess.com/news'}>
                                 <span>Chess.com news</span>
                        </Link>
                    </li>
                </ul>
            </ul>
            
        </>
    );
}