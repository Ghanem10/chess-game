import React from 'react';

export default function FriendsComponent({ user, data }) {
    return (
        <div className='profile-body-friends'>
            <h1>Friends List</h1>
            {
                (user?.user.connectedfrineds.length > 0) ? (
                    <div className='friends-list'>
                        {
                            user.map((friend, index) => (
                                console.log(friend),
                                    <div className='friend' key={index}>
                                        <img 
                                            src={friend.avatar} 
                                            referrerPolicy="no-referrer" 
                                        />
                                        <span>{friend.name}</span>
                                    </div>
                                )
                            )
                        }
                    </div>
                ) : (
                    <div className='friends-list'>
                        {
                            console.log(data)
                        }
                        {
                            data.map((friend, index) => (
                                    <div className='friend' key={index}>
                                        <img 
                                            src={friend.avatar} 
                                            referrerPolicy="no-referrer" 
                                        />
                                        <span>{friend.name}</span>
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}