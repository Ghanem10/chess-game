import { 
    faGithub, 
    faLinkedin, 
    faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            {/* refactor */}
            <ul className='items'>
                
                <h1 
                    style={{
                        backgroundImage: "url('./pawn.png')"
                    }}
                >
                    <span>Chess.io</span>
                </h1>
                
                <li className='play-list one'>
                    <img 
                        src='./chess.png' 
                        id='ICON'
                    />
                    <span>Play</span>
                </li>

                <ul className='play'>
                    <li>
                        <img 
                            src='./vscomputer.png' 
                            id='ICON'
                        />
                        <span>Play vs computer</span>
                    </li>
                    <li>
                        <img 
                            src='./multiple.png' 
                            id='ICON'
                        />
                        <span>Multiple player</span>
                    </li>
                </ul>

                <li className='social-list one'>
                    <img 
                        src='./social-media.png' 
                        id='ICON'    
                    />
                    <span>Social</span>
                </li>
                
                <ul className='social'>

                    <li>
                        <button className='linkedin'>
                            <Link to={'https://www.linkedin.com/in/gani-al'}>
                                <FontAwesomeIcon 
                                    id='social-icon-linkedin' 
                                    icon={faLinkedin}
                                /> 
                                <span id='social-links'>LinkedIn</span>
                            </Link>
                        </button>
                    </li>

                    <li>
                        <button className='gitHub'>
                            <Link to={'https://github.com/gani1000'}>
                                <FontAwesomeIcon 
                                    id='social-icon-github' 
                                    icon={faGithub}
                                /> 
                                <span id='social-links'>GitHub</span>
                            </Link>
                        </button>
                    </li>

                    <li>
                        <button className='twitter'>
                            <Link to={'https://twitter.com/gani10000'}>
                                    <FontAwesomeIcon 
                                        id='social-icon-twitter' 
                                        icon={faTwitter}
                                    /> 
                                    <span id='social-links'>Twitter</span>
                            </Link>
                        </button>
                    </li>

                </ul>
                
                <li className='themes-list one'>
                    <img 
                        src='./themes.png' 
                        id='ICON'    
                    />
                    <span>Theme</span>
                </li>

                {/* #TODO.. Create a for loop and pass the li values accordingly */}
                <ul className='themes'>
                    <li onClick={() => getValue(1)}><img src='./chess6.png' /> <h5>Green</h5></li>
                    <li onClick={() => getValue(2)}><img src='./chess2.png' /> <h5>Blue</h5></li>
                    <li onClick={() => getValue(4)}><img src='./chess1.png' /> <h5>Brown</h5></li>
                    <li onClick={() => getValue(5)}><img src='./chess4.png' /> <h5>Purple</h5></li>
                    <li onClick={() => getValue(6)}><img src='./chess3.png' /> <h5>Black</h5></li>
                    <li onClick={() => getValue(3)}><img src='./chess5.png' /> <h5>Original</h5></li>
                </ul>
                
                <li className='news-list one'>
                    <img 
                        src='./news.png' 
                        id='ICON'
                    />
                    <span>News</span>
                </li>

                <ul className='news'>
                    <li>
                        <img 
                            src='./news.png' 
                            id='ICON'
                        />
                        <Link to={'https://www.chess.com/news'}>
                            <span>Chess.com news</span>
                        </Link>
                    </li>
                </ul>
            </ul>
        </>
    );
}