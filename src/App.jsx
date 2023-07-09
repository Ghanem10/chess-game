
import React from "react";
import ReferenceBoard from "../ReferenceBoard/ReferenceBoard";
import SideBar from '../interface/sidebar/sideBarItems';
import Props from "../interface/wraper/props";
import '../Component/sass/board.scss';
import './App.scss';

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