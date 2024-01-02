import React from 'react';
import * as Icon from 'react-bootstrap-icons';

export default function TournamentHeaderMain({ 
    filterTournaments, 
    isDeleteTournament,
    deleteTournaments }) {

    
    return (
        <div className='tournament-header-main'>
            <div className='tournament-header-left-buttons'>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className='tournament-header-search'>
                <label htmlFor="search">
                    <input 
                        onChange={(e) => filterTournaments(e)} 
                        type="text" name="search" 
                        placeholder='search tournament...' 
                    />
                </label>
            </div>
            {isDeleteTournament && (
                <Icon.Trash className='delete-icon' onClick={deleteTournaments} />
            )}
        </div>
    );
}