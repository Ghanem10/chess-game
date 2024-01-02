
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../redux/actions/userAction';

import Template from '../components/profile/template';
import Header from '../components/profile/header';
import Status from '../components/profile/status';
import FriendsComponent from '../components/friends/friendsComponent';

import TestFriendsData from '../data/friends.json';

import '../assets/scss/profile&settings/profile.scss';

export default function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userData = useSelector((state) => state.user);
    const userId = JSON.parse(localStorage.getItem("token")).user._id;
    
    const [data, setData] = useState(
        userData.length > 0
        ? []
        : TestFriendsData
    );

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
                (!loading) ? (
                    <React.Fragment>
                        <Header user={userData} logOut={logOut} />
                        <div className='profile-body-section'>
                            <Status user={userData} />
                            <FriendsComponent user={userData} data={data} />
                        </div>
                    </React.Fragment>
                ) : <Template />
            }
        </div>
    );
}