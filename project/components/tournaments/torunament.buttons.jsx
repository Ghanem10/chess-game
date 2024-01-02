import React from 'react';

export default function TournamentButtons({ hiddeTemplate, createTournament }) {
    return (
        <div className='tournaments-buttons'>
            <button className='button-cancel' onClick={hiddeTemplate}>
                Cancel
            </button>
            <button className='button-save' onClick={createTournament}>
                Save
            </button>
        </div>
    );
}
