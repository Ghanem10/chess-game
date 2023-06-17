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
                    <li onClick={() => getValue(1)}><img src='./theme1.png' /> <h5>Green & white</h5></li>
                    <li onClick={() => getValue(2)}><img src='./theme2.png' /> <h5>Blue & white</h5></li>
                    <li onClick={() => getValue(4)}><img src='./theme3.png' /> <h5>Brown & white</h5></li>
                    <li onClick={() => getValue(5)}><img src='./theme4.png' /> <h5>Purple & white</h5></li>
                    <li onClick={() => getValue(6)}><img src='./theme5.png' /> <h5>Black & white</h5></li>
                    <li onClick={() => getValue(3)}><img src='./theme1.png' /> <h5>Original</h5></li>
                </ul>
                <li className='news-list'>
                <FontAwesomeIcon 
                    icon={faNewspaper}
                    id='icon-four'
                /> 
                <span>News</span>
                </li>
                <ul className='news'>
                    <Link to={'https://www.chess.com/news'}>
                        <li>
                            <img src='./news.png'/> <h4>Chess.com news</h4>
                        </li>
                    </Link>
                </ul>
            </ul>
            
        </>
    );
}