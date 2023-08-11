
import React, { useEffect, useState } from "react";
import ReferenceBoard from "../ReferenceBoard/ReferenceBoard";
import SideBar from '../interface/sidebar/sideBarItems';
import Props from "../interface/wraper/props";
import MAP from "./MAP";
import '../Component/sass/board.scss';
import './App.scss';

export default function App() {
    const { width } = useWindowDimensions();
    
    function windowSize() {

        if (width <= 1075) {
        
            return <MAP />;
        
        } else {
            return <Component />
        }
    }

    return windowSize();
}

function Component() {
    return (
        <div className="app">
            <Props>
                <SideBar />
                <ReferenceBoard />
            </Props>
        </div>
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