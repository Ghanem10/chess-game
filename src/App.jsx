
import React, { useState } from "react";
import ReferenceBoard from "../ReferenceBoard/ReferenceBoard";
import SideBar from '../interface/sidebar/sideBarItems';
import Props from "../interface/wraper/props";
import '../Component/sass/board.scss';
import './App.scss';

function App() {
    const [tracker, setTracker] = useState(true);

    setTimeout(() => {
        setTracker(false);
    }, 10000);
    
    return (
        <div className="app">
            {
                tracker && 
                <div className="notify">
                    <p>Our Game is under maintenance, We appreciate your patience.</p>
                </div>
            }
            <Props>
                <SideBar />
                <ReferenceBoard />
            </Props>
        </div>
    );
}

export default App;