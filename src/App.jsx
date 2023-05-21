
import React from "react";
import ChessBoard from "./Component/chessBoard/chessBoard";
import './Component/sass/board.scss';
import './App.scss';
import ReferenceBoard from "./Component/ReferenceBoard/ReferenceBoard";

function App() {
    
    return (
        <div className="app">
            <ReferenceBoard />
        </div>
    );
}

export default App;