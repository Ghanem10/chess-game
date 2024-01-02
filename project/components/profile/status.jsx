import React from 'react';

export default function Status({ user }) {
    return (
        <div className='profile-page-body'>
            <h2>Achivements</h2>
            <div className='profile-status-bg'>
                <div className='profile-page-status'>
                    <span>
                        Wins: <strong>{user?.user.wins}</strong>
                    </span>
                    <span>
                        Losses: <strong>{user?.user.losses}</strong>
                    </span>
                    <span>
                        Draws: <strong>{user?.user.draws}</strong>
                    </span>
                </div>
            </div>
            <span>
                Total points: <strong>{user?.user.points}</strong>
            </span>
        </div>
    );
}