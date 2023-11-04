
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { observer } from '../util/animate';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

/** Style */
import '../assets/scss/_sectionIntro.scss';
import Setting from '../components/settings/setting';

export default function SectionIntro() {
    
    const [openSettings, setOpenSettings] = useState(false);

    const startGame = () => {
        Cookies.set("startGame", "true");
    };

    useEffect(() => {
        const section = document.querySelector('.section-intro-page');
        const sectionBody = document.querySelector('.section-intro-body');
        const buttons = document.querySelectorAll('.left');
        const text = document.querySelectorAll('.right');
        
        observer.observe(section);
        observer.observe(sectionBody);

        buttons.forEach((b) => observer.observe(b));
        text.forEach((b) => observer.observe(b));
    }, [observer]);

    return (
        <React.Fragment>
            <section className='section-intro-page'>
                <Navbar />
                {openSettings && <div className='highlight'></div>}
                <div className='section-intro-page-animation'>
                    <div className='section-intro-page-login'>
                        <Link to={'/Register'}>
                            <button>Sign up</button>
                        </Link>
                    </div>
                    <div className='section-intro-animation-left'>
                        <h1 className='right'>Chess Game with supported features</h1>
                        <p className='right'>
                            Chess is a game played between two opponents on opposite sides of a board 
                            containing 64 squares of alternating colors. Each player has 16 pieces: 1 king,
                            1 queen, 2 rooks, 2 bishops, 2 knights, and 8 pawns. The goal of the game is 
                            to checkmate the other king.
                        </p>
                    </div>
                    <div className='section-intro-animation-right'>
                        <div className='left'>
                            <Link to={'/GameStart'}>
                                <button onClick={startGame}>
                                    Start Game
                                </button>
                            </Link>
                        </div>
                        <div className='left'>
                            <Link to={'/VsEngine'}>
                                <button>Vs Engine</button>
                            </Link>
                        </div>
                        <div className='left'>
                            <Link to={'/'}>
                                <button>Tournament</button>
                            </Link>
                        </div>
                        <div className='left'>
                            <button onClick={
                                () => setOpenSettings(true)
                            }>
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
                {openSettings && <Setting setOpenSettings={setOpenSettings} />}
            </section>
            <section className='section-intro-body'>
                <div className='section-intro-page-body'>
                    <div className='section-intro-page-body-1 left'>
                        <h1>John Doe</h1>
                        <p>
                            Chess Plus is an amazing website. 
                            I love playing chess here, and the 
                            user experience is top-notch!
                        </p>
                    </div>
                    <div className='section-intro-page-body-2 left'>
                        <h1>Jane Smith</h1>
                        <p>
                            Chess Plus is fantastic. The chess community 
                            here is great, and the website is easy to navigate.
                        </p>
                    </div>
                    <div className='section-intro-page-body-3 left'>
                        <h1>David Johnson</h1>
                        <p>
                            I've been enjoying Chess Plus for a while now. 
                            It's the best place to play chess online!
                        </p>
                    </div>
                </div>

                <div className='footer-section'>
                    <p>@2023-11-1 <strong>Copy right</strong> reserved. 🎈</p>
                </div>
            </section>
        </React.Fragment>
    )
}