import React from 'react';

export default function JoinButton({ tournament, joinButton }) {
    return (
        <div className='card-date'>
            <span>{tournament.date.slice(0,10)}</span> 
            <button onClick={() => joinButton(tournament._id)}>
                Join
            </button>   
        </div>     
    );
}