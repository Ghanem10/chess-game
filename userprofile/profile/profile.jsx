import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './profile.scss';

export default function UserProfile() {

    const [status, setStatus] = useState(navigator.onLine);
    const [data, setData] = useState([]);

    let playerRating = {
        rank: 600,
        wins: 0,
        losses: 0,
    };
    
    async function updatePlayerInfo() {
        const playerID = JSON.parse(Cookies.get("loggedIn-User"));
        try {

            await axios.post(`${import.meta.env.VITE_URL}/player/status`, 
            { 
                playerID, 
                rating: playerRating,

            }).then(res => {

                setData(res.data.player);
            });

        } catch (error) {
            console.log(error);
        }
    }

    function mainPage() {
        window.location.href = '/';
    }

    useEffect(() => {
        updatePlayerInfo();
        window.addEventListener("online", () => setStatus(true));
        window.addEventListener("offline", () => setStatus(false));
    }, []);

    return (
        <div className="user-auth">
            <div className='img'></div>
            <div className="user-profile">
                <h3>{data.email}</h3>
                <ul>
                    <li>
                        <h3>Status</h3>
                        <span>{status ? "Online" : "Offline"}</span>
                    </li>
                    <li>
                        <h3>Wins</h3>
                        <span>{(!data.wins) ? playerRating.wins : data.wins}</span>
                    </li>
                    <li>
                        <h3>Losses</h3>
                        <span>{(!data.losses) ? playerRating.losses : data.losses}</span>
                    </li>
                    <li>
                        <h3>Points</h3>
                        <span>{(!data.rank) ? playerRating.rank : data.rank}</span>
                    </li>
                </ul>
            </div>
            <button className='btn-profile' onClick={mainPage}>Main page</button>
        </div>
    );
}