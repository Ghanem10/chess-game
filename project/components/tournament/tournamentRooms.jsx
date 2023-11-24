import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/scss/tournament.scss';

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

    return (
        <React.Fragment>
            {openMenu && <div className='highlight'></div>}
            <div className='main-tournament-section'>
                <div className='tournaments-section'>
                    <span>No tournaments available</span>
                </div>
                <div className='tournament-template-strc'>
                    <button onClick={showTemplate} className='button-1'>Create new Tournament</button>
                    <div className='tournament-template' ref={refTemplate}>
                        <label htmlFor="name">Tournament Name</label>
                        <input type="text" name="name" id="" />
                        <div className='tournaments'>
                            {!data ? (
                                <div></div>
                            ): (
                                <div>You have no friends :(</div>
                            )}
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
                    <Link to={'/'}>
                        <button className='button-2'>Main page</button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
}