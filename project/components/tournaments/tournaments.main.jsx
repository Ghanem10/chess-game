
import React from 'react';
import JoinButton from './joinButton';
import TournamentDetail from './tournamentDetail';

export default function TournamentsMain({
    tournaments, 
    searchTerm, 
    joinButton, 
    isDeleteTournament,
    tournamentToDelete,
    setTournamentToDelete }) {

    const filteredTournaments = tournaments.filter((tournament) =>
        tournament.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addTournamentToDelete = (event) => {
        setTournamentToDelete([...tournamentToDelete, event.target.value]);
    };

    return (
        <div className='tournament-body-main'>
            {filteredTournaments.map((tournament, idx) => (
                isDeleteTournament ? (
                    <label htmlFor={`tournament-${idx}`} key={idx}>
                        <div 
                            key={idx}
                            className='tournament-card' 
                        >
                            <div className='delete-cards'>
                                <input 
                                    type="checkbox" 
                                    id={`tournament-${idx}`} 
                                    name={`tournament-${idx}`} 
                                    value={tournament._id}
                                    onClick={addTournamentToDelete}
                                />
                                <div className='tournament-detail'>
                                    <TournamentDetail tournament={tournament} />
                                </div>
                            </div>
                            
                            <JoinButton 
                                joinButton={joinButton} 
                                tournament={tournament} 
                            />      
                        </div>    
                    </label>
                ) : (
                    <div 
                        key={idx}
                        className='tournament-card' 
                    >
                        <div className='card-title-members'>
                            <TournamentDetail tournament={tournament} />
                        </div>
                        
                        <JoinButton 
                            joinButton={joinButton} 
                            tournament={tournament} 
                        />
                    </div>
                )
            ))}
        </div>
    );
}