
import React from "react";
import ReferenceBoard from "./ReferenceBoard/ReferenceBoard";
import SideBar from "./interface/sidebar/sideBarItems";
import './Component/sass/board.scss';
import './App.scss';
import Props from "./interface/wraper/props";

function App() {
    return (
        <div className="app">
            <Props>
                <SideBar />
                <ReferenceBoard />
            </Props>
        </div>
    );
}

export default App;