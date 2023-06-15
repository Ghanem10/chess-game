import React, { createContext, useState } from 'react';

export const LightContext = createContext();

export default function Props({ children }) {
    const [lightUI, setLightUI] = useState(false);
    const [recordMoves, setRecordMoves] = useState([]);

    return (
        <LightContext.Provider 
            value={{ 
                lightUI, 
                setLightUI, 
                recordMoves, 
                setRecordMoves 
            }}>
            {children}
        </LightContext.Provider>
    );
}