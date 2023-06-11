
import React from "react";
import ReferenceBoard from "./ReferenceBoard/ReferenceBoard";
import SideBar from "./interface/sidebar/sideBarItems";
import RecordMoves from "./interface/recordmoves/moves";
import './Component/sass/board.scss';
import './App.scss';

function App() {
    return (
        <div className="app">
            <SideBar />
            <ReferenceBoard />
            <RecordMoves />
        </div>
    );
}

export default App;