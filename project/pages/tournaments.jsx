
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../../project/assets/scss/tournament.scss';

export default function TournamentRooms() {
    
    const [data, setData] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);

    const refTemplate = useRef(null);

    const showTemplate = () => {
        refTemplate.current.classList.add("showtemplate");
        setOpenMenu(true);
    };

    const cancelButton = () => {
        refTemplate.current.classList.remove("showtemplate");
        setOpenMenu(false);
    };

    useEffect(() => {
        const getTournaments = async () => {
            const token = JSON.parse(localStorage.getItem("token"));

            const tournaments = await axios.get(
                `${import.meta.env.VITE_URL}/tournament/public-tournaments`, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
            });
            setData(tournaments.data);
        };
        
        getTournaments();
    }, []);

    return (
        <React.Fragment>
            {openMenu && <div className='highlight'></div>}
            <div className='main-tournament-section'>
                <div className='tournaments-section'>
                    <span>No tournaments available</span>
                </div>
                <div className='tournament-template-strc'>
                    
                    <div className='tournament-template' ref={refTemplate}>
                        <label htmlFor="name">Tournament Name</label>
                        <input type="text" name="name" id="" />
                        <div className='tournaments'>
                            {data.map((tournament) => (
                                <div className='tournament' key={tournament.id}>
                                    <div className='tournament-name'>
                                        <span>{tournament.title}</span>
                                    </div>
                                    <div className='tournament-players'>
                                        <span>{tournament.players}</span>
                                    </div>
                                    <div className='tournament-join'>
                                        <button>Join</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className='invite-button' disabled>
                            Invite
                        </button>
                        <div className='tournaments-buttons'>
                            <button 
                                onClick={cancelButton}
                                className='button-cancel'
                            >
                                Cancel
                            </button>
                            <button>Save</button>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button onClick={showTemplate} className='button-1'>
                            Create new Tournament
                        </button>
                        <Link to={'/'}>
                            <button className='button-2'>Main page</button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}