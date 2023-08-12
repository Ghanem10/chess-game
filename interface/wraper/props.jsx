import React, { createContext, useState } from 'react';

export const LightContext = createContext();

export default function Props({ children }) {
    const [lightUI, setLightUI] = useState(false);
    const [recordMoves, setRecordMoves] = useState([]);
    const [boardColor, setBoardColor] = useState("lightblue");

    return (
        <LightContext.Provider 
            value={{ 
                lightUI, 
                setLightUI, 
                recordMoves, 
                setRecordMoves,
                boardColor,
                setBoardColor
            }}>
            {children}
        </LightContext.Provider>
    );
}