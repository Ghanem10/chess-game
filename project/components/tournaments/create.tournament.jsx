
import React from 'react';
import TournamentButtons from './torunament.buttons';

export default function CreateTournament({ 
    hiddeTemplate,
    createTournament, 
    inviteButton,
    error,
    handleTournamentDataChange }) {

    return (
        <div className='tournament-template'>

            <label htmlFor="name">
                <strong>Tournament Name</strong>
                <input 
                    onChange={handleTournamentDataChange} 
                    type="text" name="name" id="" 
                />
                {error && (
                    <span className='error-message'>{error}</span>
                )}
            </label>

            <button className='invite-button' onClick={inviteButton}>
                Invite
            </button>

            <TournamentButtons 
                createTournament={createTournament} 
                hiddeTemplate={hiddeTemplate} 
            />

        </div>
    );
}