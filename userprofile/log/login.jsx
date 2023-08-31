import React, { useCallback, useContext, useState } from 'react';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './style.scss';

export default function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    
    const fetchBackEndData = useCallback(async () => {

        if (!email || !password) {
            return;
        }
        
        try {
            
            // POST / return a token to be verified by the next middleware
            const { 
                data: { 
                    t: token, 
                }
            } = await axios.post(`${import.meta.env.VITE_URL}/auth/41v/login`, 
                { 
                    email, 
                    password 
                },
            );

            // Roll the user on the auth middleware to verify the JWT token
            await axios.post(`${import.meta.env.VITE_URL}/page/41v/Info`, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                email
            }).then(res => {

                // Get the user ID from the returned data
                const playerID = res.data.player._id;

                // Store the user's ID in a cookie to fetch for its info in profile
                Cookies.set("loggedIn-User", JSON.stringify(playerID), 
                    { 
                        expires: 7 
                    }
                );
            });
            
            navigate("/profile");

        } catch (e) {

            // TODO, handle error on login, and add loading
            // while waiting to move to the other page.
            console.log(e);
        }

    }, [email, password]);

    function handleSubmit(e) {
        e.preventDefault();
        
        setEmail("");
        setPassword("");
        
        fetchBackEndData();
    }

    // TODO, get the information of the logged users via these login providers throught their APIs.
    function githubLoginProviders() {
        window.location.href = `${import.meta.env.VITE_URL}/auth/github`;
    }

    function googleLoginProviders() {
        window.location.href = `${import.meta.env.VITE_URL}/auth/google`;
    }

    return (
        <div className="login-auth">
            <span id='title'>FIDE chess cup</span><img src='./horse.png' alt='' />
            <form onSubmit={handleSubmit} className="container-login">
                <input 
                    type="text" 
                    value={email}
                    onChange={e => handleEmailChange(e)} 
                    placeholder="Email" 
                />
                <input 
                    type="password" 
                    value={password}
                    onChange={e => handlePasswordChange(e)} 
                    placeholder="Password" 
                />
                <button type="submit" className="btn-login">Login</button>

                <div className="spliter-section">
                    <span className='first-line'></span>
                    <span className='middle-span'>OR</span>
                    <span className='last-line'></span>
                </div>

                <div className="social-provider">
                    <button 
                        className="github"
                        onClick={() => githubLoginProviders()}
                    >
                        GitHub <FontAwesomeIcon id="git" icon={faGithub} />
                    </button>
                    <button 
                        className="google"
                        onClick={() => googleLoginProviders()}
                    >
                        Google <FontAwesomeIcon id="google" icon={faGoogle} />
                    </button>
                </div>
            </form>
        </div>
    );
}