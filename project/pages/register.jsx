import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceAPI } from '../api/auth';

import '../assets/scss/log/login&register.scss';

export default function Register() {
    
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sendingReq, setSendingReq] = useState(false);
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError("Please, fill up the form.");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        setName("");
        setEmail("");
        setPassword("");
        setSendingReq(true);

        try {
            await instanceAPI.post("/auth/41v/register", { username, email, password });
            navigate("/Login");
        } catch (error) {
            setSendingReq(false);
            return `Error/Register: ${error}`;
        }
    };

    return(
        <div className="register-page-container">
            <span>Sign up form</span>
            <form onSubmit={handleSubmit} className="register-page-container-form">
                <input 
                    name="name" 
                    type="text"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name" 
                />
                <input 
                    name="email" 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                />
                <input 
                    name="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button 
                    disabled={sendingReq === true} 
                    className="register-page-form-button" 
                    type="submit"
                >
                        Register
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
                    className="login-providers"
                    onClick={() => navigate("/login")}
                >
                    Continue with login providers
                </button>
            </div>
        </div>
    );
}