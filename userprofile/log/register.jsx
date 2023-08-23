import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [handleError, setHandleError] = useState("");

    let navigate = useNavigate();

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange (e) {
        setPassword(e.target.value);
    }

    async function sendUserData() {
        try {
            await axios.post(`${import.meta.env.VITE_URL}/auth/41v/register`, { name, email, password });

            navigate("/login");

        } catch (e) {
            setHandleError(e.response.data.mes);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        setName("");
        setEmail("");
        setPassword("");

        sendUserData();

        setTimeout(() => {
            setHandleError("");
        }, 4000);
    }
 
    function continueWithLoginProivders () {
        navigate("/login");
    }

    return(
        <div className="register-auth">
            <span id='title'>FIDE chess cup</span><img src='./horse.png' alt='' />
            <form onSubmit={handleSubmit} className="container-register">
                <label className="error-register-form">{handleError}</label>
                <input 
                    name="name" 
                    type="text"
                    value={name}
                    onChange={e => handleNameChange(e)}
                    placeholder="Name" 
                    required
                />
                <input 
                    name="email" 
                    type="text"
                    value={email}
                    onChange={e => handleEmailChange(e)}
                    placeholder="Email" 
                    required
                />
                <input 
                    name="password" 
                    type="password"
                    value={password}
                    onChange={e => handlePasswordChange(e)}
                    placeholder="Password"
                    required
                />
                <button className="btn-register" type="submit">Register</button>
                
                <div className="spliter-section">
                    <span className='first-line'></span>
                    <span className='middle-span'>OR</span>
                    <span className='last-line'></span>
                </div>

                <div className="social-provider">
                    <button 
                        className="login-providers"
                        onClick={() => continueWithLoginProivders()}
                    >
                        Continue with login providers
                    </button>
                </div>
            </form>
        </div>
    );
}