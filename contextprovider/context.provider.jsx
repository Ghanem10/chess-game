import React, { createContext, useState } from 'react';

export const LightContext = createContext();

export default function ContextProvider({ children }) {
    const [lightUI, setLightUI] = useState(false);
    const [recordMoves, setRecordMoves] = useState([]);
    const [boardColor, setBoardColor] = useState("lightblue");
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true);
    const [vsEngine, setVsEngine] = useState(false);

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
                loading,
                setLoading,
                vsEngine,
                setVsEngine
            }}>
            {children}
        </LightContext.Provider>
    );
}