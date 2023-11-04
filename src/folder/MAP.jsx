import React from 'react';

export default function MAP() {

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

    return (
        <div style={divStyle}>
            <img src="./engineer.png" style={imageStyle} />
            <p 
                style={paragraphStyle}
            >
                we don't have version for small devices.
            </p>
        </div>
    );
}