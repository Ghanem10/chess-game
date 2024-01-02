import React, { useEffect, useRef, useState } from 'react';

import CreateTournament from '../components/tournaments/create.tournament';

import { useDispatch, useSelector } from 'react-redux';
import { 
    createTournamentWithId, 
    getPublicTournaments, 
    removeTournament 
} from '../redux/actions/tournamentAction';

import TournamentsMain from '../components/tournaments/tournaments.main';
import TournamentHeaderMain from '../components/tournaments/header.main';
import TournamentSidebarMain from '../components/tournaments/sidebar.main';
import TestJSONData from '../data/tournaments.json';

import '../assets/scss/tournaments/tournament.scss';


export default function TournamentRooms() {
    
    const testMod = localStorage.getItem("test") === "test" 
    ? TestJSONData
    : false;

    const userTournaments = useSelector((state) => state.user?.tournaments);
    const [tournamentToDelete, setTournamentToDelete] = useState([]);

    const [showTournamentTemplate, setShowTournamentTemplate] = useState(false);
    const [isDeleteTournament, setIsDeleteTournament] = useState(false);
    const [saveButton, setSaveButton] = useState(false);

    const [tournamentTitle, setTournamentTitle] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    

    const showTemplate = () => { setShowTournamentTemplate(true); };
    const hiddeTemplate = () => { setShowTournamentTemplate(false); };
    const showTournaments = () => { setIsDeleteTournament(pre => !pre); };
    const joinButton = () => {};
    const inviteButton = () => {};


    // Testing mod
    const [testModBoolen, setTestModBoolen] = useState(false);

    const switchToTestMode = () => {
        localStorage.setItem("test", "test");
        setTestModBoolen(pre => !pre);
    };

    const swtichToNormalMode = () => {
        localStorage.removeItem("test");
        setTestModBoolen(pre => !pre);
    };

    const handleTournamentDataChange = (event) => {
        setTournamentTitle(event.target.value);
    };

    const deleteTournaments = async () => {
        const deletePromises = tournamentToDelete.map(
            (tournamentId) => dispatch(removeTournament(tournamentId))
        );

        await Promise.all(deletePromises);
    };
    
    const createTournament = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("token"))?.user._id;
            await dispatch(createTournamentWithId(userId, tournamentTitle));
            
            setSaveButton(true);
            setShowTournamentTemplate(false);
        } catch (error) {
            setError("The number of chars can't be greater than 10.");
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    useEffect(() => {
        const getTournaments = async () => {
            await dispatch(getPublicTournaments());
        };
        
        getTournaments();
    }, [saveButton, testModBoolen]);

    return (
        <React.Fragment>
            
            {showTournamentTemplate && (
                <div className='highlight'></div>
            )}

            <div className='main-tournament-section'>
                <div className='tournament-template-strc'>
                    <div className='tournament-middle-section'>
                        
                        <TournamentHeaderMain 
                            isDeleteTournament={isDeleteTournament}
                            filterTournaments={handleSearchChange}
                            deleteTournaments={deleteTournaments}
                        />
                        
                        {userTournaments?.length > 0 ? (
                            <TournamentsMain 
                                tournaments={userTournaments}
                                searchTerm={searchTerm}
                                joinButton={joinButton}
                                isDeleteTournament={isDeleteTournament} 
                                tournamentToDelete={tournamentToDelete}
                                setTournamentToDelete={setTournamentToDelete}
                            />
                        ) : (testMod ? (
                                <TournamentsMain 
                                    tournaments={testMod}
                                    searchTerm={searchTerm}
                                    joinButton={joinButton}
                                    isDeleteTournament={isDeleteTournament} 
                                    tournamentToDelete={tournamentToDelete}
                                    setTournamentToDelete={setTournamentToDelete}
                                />
                        ) : "No tournaments found." )}
                    </div>
                    
                    <TournamentSidebarMain 
                        showTournaments={showTournaments}
                        showTemplate={showTemplate} 
                        testModBoolen={testModBoolen}
                        switchToTestMode={switchToTestMode}
                        swtichToNormalMode={swtichToNormalMode}
                    />

                </div>

                {showTournamentTemplate && (
                    <CreateTournament 
                        error={error}
                        hiddeTemplate={hiddeTemplate} 
                        inviteButton={inviteButton}
                        joinButton={joinButton}
                        createTournament={createTournament}
                        handleTournamentDataChange={handleTournamentDataChange}
                    />
                )}
                
            </div>
        </React.Fragment>
    );
}