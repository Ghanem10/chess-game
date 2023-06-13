import React, { createContext, useState } from 'react';

export const LightContext = createContext();

export default function Props({ children }) {
    const [lightUI, setLightUI] = useState(false);

    return (
        <LightContext.Provider value={{ lightUI, setLightUI }}>
            {children}
        </LightContext.Provider>
    );
}