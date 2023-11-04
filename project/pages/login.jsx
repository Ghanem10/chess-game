import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { instanceAPI } from '../api/auth';

import '../assets/scss/log/login&register.scss';

export default function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sendingReq, setSendingReq] = useState(false);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        setEmail("");
        setPassword("");
        setSendingReq(true);

        try {
            const axiosResponse = await instanceAPI.post("/auth/41v/login", { 
                data: {
                    email, password
                }
            });

            const status = axiosResponse.status;

            if (status === 200) {
                console.log("AUTH USER");
                const { token } = axiosResponse.data;
                localStorage.setItem("AuthUser", { token });
                navigate("/");
            } else {
                setSendingReq(false);
                return false;
            }

        } catch (error) {
            return `Error/Login: ${error}`;
        }
    };

    const githubLoginProviders = () => {
        window.location.href = `${import.meta.env.VITE_URL}/auth/github`;
    };

    const googleLoginProviders = () => {
        window.location.href = `${import.meta.env.VITE_URL}/auth/google`;
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
                />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
                <button disabled={sendingReq === true} type="submit" className="login-page-form-button">Login</button>
            </form>
            <div className="spliter-section">
                <span className='first-line'></span>
                <span className='middle-span'>OR</span>
                <span className='last-line'></span>
            </div>
            <div className="buttons-social-providers">
                <button disabled={sendingReq === true}  onClick={() => githubLoginProviders()}>
                    GitHub <Icon.Github className='github-icon'/>
                </button>
                <button disabled={sendingReq === true} onClick={() => googleLoginProviders()}>
                    Google <Icon.Google className='google-icon' />
                </button>
            </div>
        </div>  
    );
}