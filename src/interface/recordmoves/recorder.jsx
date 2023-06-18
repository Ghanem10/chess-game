import React, { useContext, useState } from 'react';
import { LightContext } from '../wraper/props';
import './recorder.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowLeft, 
    faArrowRight, 
    faChessKing, 
    faChessKnight
} from '@fortawesome/free-solid-svg-icons';

export default function Recorder() {
    const { recordMoves, setRecordMoves } = useContext(LightContext);
    const [count, setCount] = useState(0);
    
    const moveBack = () => {
        if (recordMoves.length === 0) return;
        setRecordMoves(prePos => prePos.slice(0, -1));
        setLast([recordMoves.slice(-count)[0]]);
    };

    const moveForward = () => {
        
    };

    return (
        <div className='record-container'>
            <h2>
                <FontAwesomeIcon 
                    icon={faChessKnight} 
                    id='icon-knight' 
                /> Record moves
            </h2>
            <div className='record-moves'>
                {recordMoves}
            </div>
            <div className='btns-record-moves'>
                <button className='record-left' onClick={moveBack}>
                    <FontAwesomeIcon 
                        icon={faArrowLeft} 
                        id='arrow-left'
                    />
                </button>
                <button className='record-right' onClick={moveForward}>
                    <FontAwesomeIcon 
                        icon={faArrowRight} 
                        id='arrow-right'
                    />
                </button>
            </div>
            <div className='foot-record-moves'>
                <FontAwesomeIcon 
                    icon={faChessKing}
                    id='foot-icon' 
                /> <span>One Game, let's play!</span>
            </div>
        </div>
    );
}