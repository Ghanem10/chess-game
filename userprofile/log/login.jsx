import React, { useCallback, useState } from 'react';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
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
            const { 
                data: { 
                    t: token, 
                }
            } = await postData.post(`/auth/41v/login`, { email, password });

            await postData.post(`/page/41v/Info`, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });

            navigate("/");

        } catch (e) {
            console.log(e);
        }

    }, [email, password]);

    function handleSubmit(e) {
        e.preventDefault();
        
        setEmail("");
        setPassword("");
        
        fetchBackEndData();
    }

    function githubLoginProviders() {
        window.location.href = `${process.env.MAIN_PAGE}/auth/github`;
    }

    function googleLoginProviders() {
        window.location.href = `${process.env.MAIN_PAGE}/auth/google`;
    }

    return (
        <div className="login">
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