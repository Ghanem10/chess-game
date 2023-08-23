import React from 'react'

export default function UserProfile() {

    return (
        <div className="user-auth">
            <img src='' alt=''/>
            <div className="user-profile">
                <ul>
                    <li>
                        <h3>Status</h3>
                        <span></span>
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