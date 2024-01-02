
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as Icons from 'react-bootstrap-icons';

export default function TournamentSidebarMain({ 
    showTemplate, 
    showTournaments,
    testModBoolen,
    switchToTestMode,
    swtichToNormalMode }) {
    
    return (
        <div className='tournament-sidebar-main'>
            <div className='tournament-sidebar-title'>
                <h2>Tournaments side bar</h2>
            </div>
            
            <div className='tournament-sidebar'>
                <button 
                    onClick={showTemplate}
                >
                    Create Tournament
                </button>
                <button onClick={showTournaments}>
                    Delete Tournament
                </button>
                {testModBoolen ? (
                    <button onClick={switchToTestMode}>
                        Switch to test mode
                    </button>
                    ) : (
                        <button onClick={swtichToNormalMode}>
                        Switch to normal mode
                    </button>
                )}
                <Link to='/'>
                    <button>Main Page</button>
                </Link>
            </div>

            <div className='tournament-sidebar-bottom'>
                <Icons.Fire className='bottom-icons' />
                <Icons.Bullseye className='bottom-icons' />
            </div>
        </div>
    );
}