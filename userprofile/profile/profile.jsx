import React, { useContext, useEffect, useState } from 'react';
import { LightContext } from '../../contextprovider/context.provider';
import axios from 'axios';

export default function UserProfile() {

    // TODO, Context values are lost on page refresh.
    // Best is to store in database, not in client.
    // Add an API ending point for player info -
    // real time updates after adding ws and graphQl. 
    const [userStatus, setUserStatus] = useState(false);
    const { userEmail } = useContext(LightContext);
    
    async function craftUserGameInfo() {
        try {

            // Info goes here.
        
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        craftUserGameInfo();
    }, []);

    return (
        <div className="user-auth">
            <img src='' alt=''/>
            <div className="user-profile">
                <ul>
                    <li>
                        <h1>Player</h1>
                        <span>{userEmail}</span>
                    </li>
                    <li>
                        <h3>Status</h3>
                        <span>{userStatus ? "Online" : "Offline"}</span>
                    </li>
                    <li>
                        <h3>Wins</h3>
                        <span></span>
                    </li>
                    <li>
                        <h3>Losses</h3>
                        <span></span>
                    </li>
                </ul>
                <h3>Points: </h3>             
            </div>
        </div>
    );
}