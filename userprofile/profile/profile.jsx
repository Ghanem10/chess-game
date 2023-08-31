import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './profile.scss';

export default function UserProfile() {

    const [userStatus, setUserStatus] = useState(false);
    const [data, setData] = useState([]);

    // Default player rates/wins/losses
    let playerRating = {
        rank: 600,
        wins: 0,
        losses: 0,
    };
    
    async function updatePlayerInfo() {

        // Get the player's ID from cookie stored in the browser
        const playerID = JSON.parse(Cookies.get("loggedIn-User"));

        try {

            // POST / update the player info based on the played match
            await axios.post(`${import.meta.env.VITE_URL}/player/status`, 
            { 
                playerID, 
                rating: playerRating,

            }).then(res => {

                // Store the returned Obj in var
                setData(res.data.player);

            });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updatePlayerInfo();
    }, []);

    return (
        <div className="user-auth">
            <div className='img'></div>
            <div className="user-profile">
                <h3>{data.email}</h3>
                <ul>
                    <li>
                        <h3>Status</h3>
                        <span>{userStatus ? "Online" : "Offline"}</span>
                    </li>
                    <li>
                        <h3>Wins</h3>
                        <span>{data.wins}</span>
                    </li>
                    <li>
                        <h3>Losses</h3>
                        <span>{data.losses}</span>
                    </li>
                    <li>
                        <h3>Points</h3>
                        <span>{data.rank}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}