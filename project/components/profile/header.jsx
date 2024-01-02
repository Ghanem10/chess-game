import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ user, logOut }) {
    return (
        <div className='profile-page-header'>
            <div className='profile-info'>
                <img 
                    src={user?.user.avatar} 
                    referrerPolicy="no-referrer" 
                />
                <div className='profile-page-header-info'>
                    <h2>{user?.user.name}</h2>
                    <span>
                        <strong>Email:</strong> {user?.user.email} 
                    </span>
                    <span>
                        <strong>Location:</strong> Unknown
                    </span>
                </div>
            </div>
            <div className='profile-page-buttons'>
                <Link to="/">
                    <button>Main page</button>
                </Link>
                <button onClick={logOut}>
                    Log out
                </button>
            </div>
        </div>
    )
}