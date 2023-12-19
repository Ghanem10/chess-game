
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../redux/actions/userAction';

import '../assets/scss/profile&settings/profile.scss';

export default function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user?.user);
    const userId = JSON.parse(localStorage.getItem("token")).user._id;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            await dispatch(getUserAction(userId));
        };
        
        getUser().then(() => setLoading(false));
    }, [
        dispatch, 
        userId
    ]);

    const logOut = async () => {

        await axios.post(`${import.meta.env.VITE_URL}/user/logout`);

        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className='profile-page-container'>
            {
                (loading) ? (
                    <React.Fragment>
                        <div className='profile-page-header'></div>
                        <div className='profile-page-body'></div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className='profile-page-header'>
                            <div className='profile-info'>
                                <img 
                                    src={user.avatar} 
                                    referrerPolicy="no-referrer" 
                                />
                                <div className='profile-page-header-info'>
                                    <h2>{user.name}</h2>
                                    <span>
                                        <strong>Email:</strong> {user.email} 
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
                        <div className='profile-page-body'>
                            <h2>Achivements</h2>
                            <div className='profile-status-bg'>
                                <div className='profile-page-status'>
                                    <span>
                                        Wins: <strong>{user.wins}</strong>
                                    </span>
                                    <span>
                                        Losses: <strong>{user.losses}</strong>
                                    </span>
                                    <span>
                                        Draws: <strong>{user.draws}</strong>
                                    </span>
                                </div>
                                <div className='profile-page-bdg'>

                                </div>
                            </div>
                            <span>
                                Total points: <strong>{user.points}</strong>
                            </span>
                        </div>
                    </React.Fragment>
                )
            }           
        </div>
    );
}