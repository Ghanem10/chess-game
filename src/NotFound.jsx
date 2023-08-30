import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    
    const divStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        width: "100%",
        height: "100vh",
    };

    const paragraphStyle = {
        width: "auto",
        color: "white",
        fontSize: "23px",
        textAlign: 'center'
    };

    const imageStyle = {
        width: "30%",
        height: "auto",  
    };

    const linkStyle = {
        color: "green",
        fontSize: "20px"
    };

    return (
        <div style={divStyle}>
            <img src="/plug-in.png" style={imageStyle} />
            <p 
                style={paragraphStyle}
            >
                I don't know where we're!
            </p>
            <Link style={linkStyle} to={"/"}>Get back</Link>
        </div>
    );
}