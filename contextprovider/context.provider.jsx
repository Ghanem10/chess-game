import React, { createContext, useState } from 'react';

export const LightContext = createContext();

export default function ContextProvider({ children }) {
    const [lightUI, setLightUI] = useState(false);
    const [recordMoves, setRecordMoves] = useState([]);
    const [boardColor, setBoardColor] = useState("lightblue");
    const [toggle, setToggle] = useState(false);

    return (
        <LightContext.Provider 
            value={{ 
                lightUI, 
                setLightUI, 
                recordMoves, 
                setRecordMoves,
                boardColor,
                setBoardColor,
                toggle,
                setToggle,
            }}>
            {children}
        </LightContext.Provider>
    );
}