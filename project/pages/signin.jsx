import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Envelope, Lock } from 'react-bootstrap-icons';

import { useDispatch, useSelector } from 'react-redux';
import { signInAction, signUpAction } from '../redux/actions/authAction';

import '../assets/scss/log/login&register.scss';

export default function SignIn() {
    
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signInError = useSelector((state) => state.auth?.signInError);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill the missing fields.");

            setTimeout(() => {
                setError("");
            }, 5000);

            return;
        }

        setLoading(true);
        setLoadingText("Signing in...");
        
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        
        const timeout = setTimeout(() => {
            setLoadingText(
                "This is taking longer than usual. Please wait while backend services are getting started."
            );
        }, 5000);
        
        await dispatch(signInAction(formData, navigate));

        setLoading(false);
        clearTimeout(timeout);
    };
    
    const signUpAsDemo = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append("name", "Demo");
        formData.append("email", "demo@gmail.com");
        formData.append("password", "demo");

        setEmail("demo@gmail.com");
        setPassword("demo");
        
        await dispatch(signUpAction(formData, navigate));
        await dispatch(signInAction(formData, navigate));
    };

    return (
        <div className="login-page-container">
            <span className="form-title">Sign in form</span>
            <form onSubmit={handleSubmit} className="login-page-form">

                <label htmlFor="email">
                    <Envelope className="icon" size={22} />
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email"
                        tabIndex={1}
                    />
                </label>

                <label htmlFor="password">
                    <Lock className="icon" size={22} />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        tabIndex={2}
                    />
                </label>
                
                <Link 
                    to={"/Profile"} 
                    className="demo-link"
                    onClick={signUpAsDemo}
                >
                        Sign as a demo?
                </Link>
                
                <button 
                    tabIndex={3} 
                    type="submit" 
                    className={loading ? "login" : "login-page-form-button" }
                    disabled={loading === true}
                >
                    {loading ? loadingText : "Login"}
                </button>
            </form>
            {(signInError || error)  && <span className="error-message">{(signInError || error)}</span>}
            <span className="signup-link">Don't have an account? <Link to={"/signup"}>Sign up</Link></span>
        </div>  
    );
}