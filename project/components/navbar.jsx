
import React, { useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default function Navbar() {

    useEffect(() => {
        const span = document.querySelector('.nav-profile-icon-1');
        const messageDiv = document.querySelector('.nav-notification');
        messageDiv.style.display = 'none';
        
        const handleClick = () => {
            if (messageDiv.style.display === 'none') {
                messageDiv.style.display = 'flex';
            } else {
                messageDiv.style.display = 'none';
            }
        };

        span.addEventListener('click', handleClick);

        return () => {
            span.removeEventListener("click", handleClick);
        }
    }, []);

    return (
        <nav>
            <h2>
                <Link to={'/'}>
                    Chess Plus
                </Link>
            </h2>
            <ul>
                <li><Link to={'/'}>Puzzels</Link></li>
                <li><Link to={'/'}>Learn</Link></li>
                <li><Link to={'/'}>Community</Link></li>
                <li><Link to={'/'}>Tools</Link></li>
            </ul>
            <div className='nav-profile'>
                <span className='nav-profile-icon-1'>
                    <Icon.Bell className='profile-icon-1' />
                </span>
                <div className='nav-notification'>
                    <span>Notifications</span>
                </div>
                <Link to={'/Profile'}>
                    <span className='nav-profile-icon-2'>
                        <Icon.Person className='profile-icon-2'/>
                    </span>
                </Link>
            </div>
        </nav>
    );
}