import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { instanceAPI } from '../api/auth';

import '../assets/scss/log/login&register.scss';

export default function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sendingReq, setSendingReq] = useState(false);
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please, fill up the form.");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        setEmail("");
        setPassword("");
        setSendingReq(true);

        try {
            const axiosResponse = await instanceAPI.post(`${import.meta.env.VITE_URL}/auth/41v/login`, { 
                email, password
            }, { timeout: 2000 });

            if (axiosResponse.status === 200) {
                const ID = axiosResponse.data._id;
                localStorage.setItem("Provider", JSON.stringify("JWT"));
                navigate(`/Profile?id=${ID}`);
            } else {
                setSendingReq(false);
                return false;
            }

        } catch (error) {
            setSendingReq(false);
            console.log(`Error/Login: ${error}`);
        }
    };

    const githubLoginProviders = async () => {
        localStorage.setItem("Provider", JSON.stringify("github"));
        window.open(`${import.meta.env.VITE_URL}/auth/42v/github`, "_self");
    };

    const googleLoginProviders = async () => {
        localStorage.setItem("Provider", JSON.stringify("google"));
        window.open(`${import.meta.env.VITE_URL}/auth/42v/google`, "_self");
    };

    return (
        <div className="login-page-container">
            <span>Sign in form</span>
            <form onSubmit={handleSubmit} className="login-page-form">
                <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    tabIndex={1}
                />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    tabIndex={2}
                />
                <button 
                    tabIndex={3} 
                    disabled={sendingReq === true} 
                    type="submit" 
                    className="login-page-form-button"
                >
                    Login
                </button>
                {error && <span>{error}</span>}
            </form>
            <div className="spliter-section">
                <span className='first-line'></span>
                <span className='middle-span'>OR</span>
                <span className='last-line'></span>
            </div>
            <div className="buttons-social-providers">
                <button 
                    disabled={sendingReq === true} 
                    tabIndex={4} 
                    onClick={() => githubLoginProviders()}
                >
                    GitHub <Icon.Github className='github-icon'/>
                </button>
                <button 
                    disabled={sendingReq === true} 
                    tabIndex={5} 
                    onClick={() => googleLoginProviders()}
                >
                    Google <Icon.Google className='google-icon' />
                </button>
            </div>
        </div>  
    );
}