import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceAPI } from '../api/auth';

import '../assets/scss/log/login&register.scss';

export default function Register() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sendingReq, setSendingReq] = useState(false);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return;
        }

        setName("");
        setEmail("");
        setPassword("");
        setSendingReq(true);

        try {
            await instanceAPI.post("/auth/41v/register", { name, email, password });
            navigate("/Login");
        } catch (error) {
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name" 
                    required
                />
                <input 
                    name="email" 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                    required
                />
                <input 
                    name="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button 
                    disabled={sendingReq === true} 
                    className="register-page-form-button" 
                    type="submit"
                >
                        Register
                </button>
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