import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Person, Envelope, Lock } from 'react-bootstrap-icons';

import { useDispatch, useSelector } from 'react-redux';
import { signUpAction } from '../redux/actions/authAction';

import '../assets/scss/log/login&register.scss';

export default function SignUp() {

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarError, setAvatarError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signUpError = useSelector((state) => state.auth?.signUpError);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setAvatar(null);
            setAvatarError(null);
            return;
        }

        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/jpg"
        ) {
            setAvatar(null);
            setAvatarError("Please upload a valid image file (jpeg, jpg, png)");
        } else if (file.size > 10 * 1024 * 1024) {
            setAvatar(null);
            setAvatarError("Please upload an image file less than 10MB");
        } else {
            setAvatar(file);
            setAvatarError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Please fill the missing fields.");

            setTimeout(() => {
                setError("");
            }, 5000);

            return;
        }

        setLoading(true);
        setLoadingText("Signing up...");

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", avatar);
        
        const timeout = setTimeout(() => {
            setLoadingText(
                "This is taking longer than usual. Please wait while backend services are getting started."
            );
        }, 5000);
        
        await dispatch(signUpAction(formData, navigate));
        
        setLoading(false);
        clearTimeout(timeout);
    };

    return(
        <div className="register-page-container">
            <span className="form-title">Sign up form</span>
            <form onSubmit={handleSubmit} className="register-page-container-form">
                <label 
                    htmlFor="name" 
                    className="input-name"
                >
                    <Person className="icon" size={22} />
                    <input 
                        name="name" 
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Name" 
                    />
                </label>
                <label
                    htmlFor="avatar"
                    className="avatar-box"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="avatar-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                    </svg>
                    <h2 className="profile-photo">Profile Photo</h2>
                    <input
                        id="avatar"
                        type="file"
                        className="file-type"
                        name="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        autoComplete="off"
                    />
                </label>

                {avatar && (
                    <div className="avatar-upload">
                        <span className="avatar-success">{avatar.name}</span>
                    </div>
                )}

                {avatarError && (
                    <div className="avatar-upload">
                        <span className="avatar-error">{avatarError}</span>
                    </div>
                )}
                
                <label
                    htmlFor="email" 
                    className="input-email"
                >
                    <Envelope className="icon" size={22} />
                    <input 
                        name="email" 
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email" 
                    />
                </label>

                <label
                    htmlFor="password" 
                    className="input-password"
                >
                    <Lock className="icon" size={22} />
                    <input 
                        name="password" 
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                    />
                </label>
                <button 
                    disabled={loading === true} 
                    className="register-page-form-button" 
                    type="submit"
                >

                    {loadingText ? (
                        <span>{loadingText}</span>
                    ) : (
                        "Register"
                    )}

                </button>
            </form>

            {(error) &&
                <span className="error-message">
                    {error || signUpError}
                </span>
            }

            <div className="buttons-social-providers">
                <button
                    disabled={loading === true}
                    className={loading ? "login" : "login-providers" }
                    onClick={() => navigate("/signin")}
                >
                    Already have an account?
                </button>
            </div>
        </div>
    );
}