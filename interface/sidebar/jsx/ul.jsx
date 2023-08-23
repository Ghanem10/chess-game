import { 
    faGithub, 
    faLinkedin, 
    faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LightContext } from '../../../contextprovider/context.provider';


export default function UnorderList() {

    const { setBoardColor } = useContext(LightContext);
    
    function getValue(colorName) {

        setBoardColor(colorName);
    }
    
    return(
        <>
            <ul className='items'>
                
                <h1 
                    style={{
                        backgroundImage: "url('./pawn.png')"
                    }}
                >
                    <span>Chess.io</span>
                </h1>
                
                <li className='play-list one'>
                    <img src='./chess.png' id='ICON' />
                    <span>Play</span>
                </li>

                <ul className='play'>
                    <li>
                        <img src='./vscomputer.png' id='ICON' />
                        <span>Play vs computer</span>
                    </li>
                    <li>
                        <img src='./multiple.png' id='ICON' />
                        <span>Multiple player</span>
                    </li>
                </ul>

                <li className='social-list one'>
                    <img src='./social-media.png' id='ICON' />
                    <span>Social</span>
                </li>
                
                <ul className='social'>

                    <li>
                        <FontAwesomeIcon 
                            id='social-icon-linkedin' 
                            icon={faLinkedin}
                        /> 
                        <Link to={'https://www.linkedin.com/in/gani-al'}>
                            <span id='social-links'>LinkedIn</span>
                        </Link>
                    </li>

                    <li>
                        <FontAwesomeIcon 
                            id='social-icon-github' 
                            icon={faGithub}
                        /> 
                        <Link to={'https://github.com/gani1000'}>
                            <span id='social-links'>GitHub</span>
                        </Link>
                    </li>

                    <li>
                        <FontAwesomeIcon 
                            id='social-icon-twitter' 
                            icon={faTwitter}
                        /> 
                        <Link to={'https://twitter.com/gani10000'}>
                            <span id='social-links'>Twitter</span>
                        </Link>
                    </li>

                </ul>
                
                <li className='themes-list one'>
                    <img src='./themes.png' id='ICON' />
                    <span>Theme</span>
                </li>

                <ul className='themes'>
                    <li onClick={() => getValue("green")}><img src='./chess6.png' /> <span>Green</span></li>
                    <li onClick={() => getValue("lightblue")}><img src='./chess2.png' /> <span>Blue</span></li>
                    <li onClick={() => getValue("brown")}><img src='./chess1.png' /> <span>Brown</span></li>
                    <li onClick={() => getValue("purple")}><img src='./chess4.png' /> <span>Purple</span></li>
                    <li onClick={() => getValue("black")}><img src='./chess3.png' /> <span>Black</span></li>
                    <li onClick={() => getValue("darkblue")}><img src='./chess5.png' /> <span>Original</span></li>
                </ul>
                
                <li className='news-list one'>
                    <img src='./news.png' id='ICON' />
                    <span>News</span>
                </li>

                <ul className='news'>
                    <li>
                        <img src='./news.png' id='ICON' />
                        <Link to={'https://www.chess.com/news'}>
                            <span>Chess.com news</span>
                        </Link>
                    </li>
                </ul>
            </ul>
        </>
    );
}