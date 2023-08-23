
import MAP from "./MAP";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../userprofile/log/register";
import Login from "../userprofile/log/login";
import SideBar from "../interface/sidebar/sideBarItems";
import ReferenceBoard from "../ReferenceBoard/ReferenceBoard";
import ContextProvider from "../contextprovider/context.provider";
import '../Component/sass/board.scss';
import './App.scss';

export default function App() {
    const { width } = useWindowDimensions();
    
    return (
        <>
            {(width <= 1075) ? <MAP /> : <AppRoute />}
        </>
    );
}

function AppRoute() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function MainPage() {
    return (
        <ContextProvider>
            <SideBar />
            <ReferenceBoard />
        </ContextProvider>
    );
}

function getWindowDimensions() {
    const { innerWidth: width } = window;
    return {
        width
    };
}
  
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return windowDimensions;
}