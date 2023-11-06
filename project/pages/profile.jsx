import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { instanceAPI } from '../api/auth';

import '../assets/scss/profile&settings/profile.scss';

export default function Profile() {

    const searchParams = new URLSearchParams(location.search);
    const ID = searchParams.get("id");
    let navigate = useNavigate();

    const [authUserData, setAuthUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const logOut = () => {
        localStorage.removeItem("Provider");
        localStorage.removeItem("AuthUser");
        navigate("/");
    };

    useEffect(() => {
        const sendRequest = async (provider, ID) => {
            try {
                const axiosResponse = await instanceAPI.get(`/auth/42v/userInfo/${provider}/${ID}`);
                if (axiosResponse.status === 200) {
                    setAuthUserData(axiosResponse.data);
                    setLoading(false);
                }
            } catch (error) {
                setError("Sorry, something went wrong try again later!");
                console.log(`Error/Github: ${error}`);
            }
        };

        const getUserData = async () => {
            const provider = JSON.parse(localStorage.getItem("Provider"));
            if (ID) {
                switch(provider) {
                    case "github":
                        sendRequest("github", ID);
                        break;
                    case "google": 
                        sendRequest("google", ID);
                        break;
                    case "JWT":
                        try {
                            const axiosResponse = await instanceAPI.get(`/auth/41v/userInfo/JWT/${ID}`);
                            if (axiosResponse.status === 200) {
                                setAuthUserData(axiosResponse.data);
                                setLoading(false);
                            }
                        } catch (error) {
                            setError("Sorry, something went wrong try again later!");
                            console.log(`Error/JWT: ${error}`);
                        }
                        break;
                    default:
                        return;
                };
            } else {
                setAuthUserData("Guest");
                setLoading(false);
            }
        };

        getUserData();
    }, []);

    return (
        <div className='profile-page-container'>
            {
                (loading) ? (
                    <span>Loading...</span>
                ) : (
                    <React.Fragment>
                        <div className='profile-page-header'>
                            <div className='profile-info'>
                                <img src={authUserData.picture || "/avatar.png"} referrerPolicy="no-referrer" />
                                <div className='profile-page-header-info'>
                                    <h2>{authUserData.username || "Guest"}</h2>
                                    <span>
                                        <strong>Email:</strong> {authUserData.email || "Guest@gmail.com"}
                                    </span>
                                    <span>
                                        <strong>Location:</strong> {authUserData.location || "unknown"}
                                    </span>
                                </div>
                            </div>
                            <div className='profile-page-buttons'>
                                <Link to={`/${ID ? `?id=${ID}`:''}`}>
                                    <button>Main page</button>
                                </Link>
                                {(ID) ? (
                                    <button onClick={logOut}>
                                        Log out
                                    </button>
                                ) : (
                                    <Link to={'/Register'}>
                                        <button>Sign up</button>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className='profile-page-body'>
                            <h2>Achivements</h2>
                            <div className='profile-page-status'>
                                <span>Wins: <strong>{authUserData.wins || 0}</strong></span>
                                <span>Losses: <strong>{authUserData.losses || 0}</strong></span>
                                <span>Draws: <strong>{authUserData.draws || 0}</strong></span>
                            </div>
                            <div className='profile-page-bdg'>
                                <svg className='svg-bdg-1' fill="#b8451e" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.009 512.009" xmlSpace="preserve" stroke="#b8451e"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M508.335,62.725c-3.968-5.867-10.581-9.387-17.664-9.387h-128c-6.997,0-13.568,3.435-17.536,9.216l-20.587,29.803 l-57.237-35.776c-6.912-4.309-15.701-4.309-22.613,0l-57.237,35.776l-20.587-29.803c-3.968-5.781-10.539-9.216-17.536-9.216h-128 c-7.083,0-13.696,3.52-17.664,9.387c-3.968,5.867-4.779,13.312-2.155,19.883l60.224,150.485 c3.797,9.536,8.981,18.389,15.339,26.304c13.845,17.28,32.853,29.099,54.123,34.773c18.56,47.232,46.848,91.477,85.184,132.203 l24.085,25.579c4.032,4.309,9.664,6.72,15.531,6.72c5.867,0,11.499-2.411,15.552-6.72l24.064-25.579 c38.336-40.725,66.624-84.971,85.184-132.203c21.269-5.675,40.277-17.493,54.101-34.731c6.379-7.957,11.563-16.811,15.381-26.347 L510.49,82.607C513.114,76.037,512.303,68.591,508.335,62.725z M115.205,137.498c-6.229,3.904-10.005,10.752-10.005,18.091 c0,13.141,0.683,26.069,1.941,38.848c0.704,7.403,2.048,14.72,3.157,22.059c0.747,4.693,1.216,9.451,2.133,14.101 c0.341,1.792,0.469,3.648,0.832,5.44c-1.003-1.067-1.984-2.176-2.901-3.328c-3.755-4.672-6.784-9.877-9.024-15.488L52.847,96.005 h85.312l13.099,18.965L115.205,137.498z M410.693,217.221c-2.261,5.611-5.291,10.816-9.067,15.509 c-0.917,1.131-1.877,2.261-2.88,3.307c0.384-1.792,0.491-3.648,0.832-5.44c0.917-4.651,1.387-9.408,2.133-14.101 c1.109-7.339,2.453-14.656,3.157-22.059c1.259-12.779,1.941-25.707,1.941-38.848c0-7.339-3.776-14.187-10.005-18.091 l-36.053-22.528l13.099-18.965h85.312L410.693,217.221z"></path> </g> </g> </g></svg>
                                <svg className='svg-bdg-2' fill="#c7c7c7" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.009 512.009" xmlSpace="preserve" stroke="#c7c7c7"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M508.335,62.725c-3.968-5.867-10.581-9.387-17.664-9.387h-128c-6.997,0-13.568,3.435-17.536,9.216l-20.587,29.803 l-57.237-35.776c-6.912-4.309-15.701-4.309-22.613,0l-57.237,35.776l-20.587-29.803c-3.968-5.781-10.539-9.216-17.536-9.216h-128 c-7.083,0-13.696,3.52-17.664,9.387c-3.968,5.867-4.779,13.312-2.155,19.883l60.224,150.485 c3.797,9.536,8.981,18.389,15.339,26.304c13.845,17.28,32.853,29.099,54.123,34.773c18.56,47.232,46.848,91.477,85.184,132.203 l24.085,25.579c4.032,4.309,9.664,6.72,15.531,6.72c5.867,0,11.499-2.411,15.552-6.72l24.064-25.579 c38.336-40.725,66.624-84.971,85.184-132.203c21.269-5.675,40.277-17.493,54.101-34.731c6.379-7.957,11.563-16.811,15.381-26.347 L510.49,82.607C513.114,76.037,512.303,68.591,508.335,62.725z M115.205,137.498c-6.229,3.904-10.005,10.752-10.005,18.091 c0,13.141,0.683,26.069,1.941,38.848c0.704,7.403,2.048,14.72,3.157,22.059c0.747,4.693,1.216,9.451,2.133,14.101 c0.341,1.792,0.469,3.648,0.832,5.44c-1.003-1.067-1.984-2.176-2.901-3.328c-3.755-4.672-6.784-9.877-9.024-15.488L52.847,96.005 h85.312l13.099,18.965L115.205,137.498z M410.693,217.221c-2.261,5.611-5.291,10.816-9.067,15.509 c-0.917,1.131-1.877,2.261-2.88,3.307c0.384-1.792,0.491-3.648,0.832-5.44c0.917-4.651,1.387-9.408,2.133-14.101 c1.109-7.339,2.453-14.656,3.157-22.059c1.259-12.779,1.941-25.707,1.941-38.848c0-7.339-3.776-14.187-10.005-18.091 l-36.053-22.528l13.099-18.965h85.312L410.693,217.221z"></path> </g> </g> </g></svg>
                                <svg className='svg-bdg-3' fill="#fff700" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.009 512.009" xmlSpace="preserve" stroke="#fff700"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M508.335,62.725c-3.968-5.867-10.581-9.387-17.664-9.387h-128c-6.997,0-13.568,3.435-17.536,9.216l-20.587,29.803 l-57.237-35.776c-6.912-4.309-15.701-4.309-22.613,0l-57.237,35.776l-20.587-29.803c-3.968-5.781-10.539-9.216-17.536-9.216h-128 c-7.083,0-13.696,3.52-17.664,9.387c-3.968,5.867-4.779,13.312-2.155,19.883l60.224,150.485 c3.797,9.536,8.981,18.389,15.339,26.304c13.845,17.28,32.853,29.099,54.123,34.773c18.56,47.232,46.848,91.477,85.184,132.203 l24.085,25.579c4.032,4.309,9.664,6.72,15.531,6.72c5.867,0,11.499-2.411,15.552-6.72l24.064-25.579 c38.336-40.725,66.624-84.971,85.184-132.203c21.269-5.675,40.277-17.493,54.101-34.731c6.379-7.957,11.563-16.811,15.381-26.347 L510.49,82.607C513.114,76.037,512.303,68.591,508.335,62.725z M115.205,137.498c-6.229,3.904-10.005,10.752-10.005,18.091 c0,13.141,0.683,26.069,1.941,38.848c0.704,7.403,2.048,14.72,3.157,22.059c0.747,4.693,1.216,9.451,2.133,14.101 c0.341,1.792,0.469,3.648,0.832,5.44c-1.003-1.067-1.984-2.176-2.901-3.328c-3.755-4.672-6.784-9.877-9.024-15.488L52.847,96.005 h85.312l13.099,18.965L115.205,137.498z M410.693,217.221c-2.261,5.611-5.291,10.816-9.067,15.509 c-0.917,1.131-1.877,2.261-2.88,3.307c0.384-1.792,0.491-3.648,0.832-5.44c0.917-4.651,1.387-9.408,2.133-14.101 c1.109-7.339,2.453-14.656,3.157-22.059c1.259-12.779,1.941-25.707,1.941-38.848c0-7.339-3.776-14.187-10.005-18.091 l-36.053-22.528l13.099-18.965h85.312L410.693,217.221z"></path> </g> </g> </g></svg>
                            </div>
                            <span>Total points: <strong>{authUserData.rank || 500}</strong></span>
                        </div>
                    </React.Fragment>
                )
            }           
        </div>
    );
}