import React, { useState } from 'react';

import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import Chat from '../chatbox/chat';

import '../../assets/scss/component/_recorder.scss';

// _helpers
let recordCount = 1;
let idxPosition = 0;

// adjust with objs
export default function Recorder(props) {

    const {  
        recordMoves, setRecordMoves, websocket,
        pieces, previousPositions, nextPosition,
        opponent, setPiece, pieceCapturedPosition, 
    } = props;

    const [lastPositionIdx, setLastPositionIdx] = useState([]);
    const cloneOpponent = opponent.map((t) => ({ ...t }));
    const searchParams = new URLSearchParams(location.search);
    const ID = searchParams.get("id");

    const moveBack = () => {

        if (recordMoves.length <= 0 || recordCount < 0) return;

        const lastPositionIdxMove = recordMoves[recordMoves.length - 1];

        setRecordMoves((prevMoves) => prevMoves.slice(0, -1));
        setLastPositionIdx((prevlastPositionIdx) => [...prevlastPositionIdx, lastPositionIdxMove]);

        const prepos = previousPositions[previousPositions.length - recordCount];
        const nextpos = nextPosition[nextPosition.length - recordCount];

        pieces.map((t) => {
        
            if (t.x === nextpos.x && t.y === nextpos.y) {
                t.x = prepos.gx; 
                t.y = prepos.gy;
            }

            return t;
        });

        const lastIndx = pieceCapturedPosition[pieceCapturedPosition.length - recordCount];

        if (lastIndx === "1") {
            const len = cloneOpponent.length;
            idxPosition += 1;

            if (idxPosition <= 0 || idxPosition > len) return;
            if (cloneOpponent !== undefined) {
                setPiece((capture) => [...capture, cloneOpponent[len - idxPosition]]);
            }
        }

        recordCount += 1;
    }

    const moveForward = () => {
        if (lastPositionIdx.length <= 0) return;
        
        recordCount -= 1;
        const nextMove = lastPositionIdx[lastPositionIdx.length - 1];

        setLastPositionIdx((prevlastPositionIdx) => prevlastPositionIdx.slice(0, -1));
        setRecordMoves((prevMoves) => [...prevMoves, nextMove]);

        const prepos = previousPositions[previousPositions.length - recordCount];
        const nextpos = nextPosition[nextPosition.length - recordCount];

        if (prepos === undefined) return;

        pieces.map((t) => {
            if (t.x === prepos.gx && t.y === prepos.gy) {
                t.x = nextpos.x; 
                t.y = nextpos.y;
            }

            return t;
        });

        const lastIndx = pieceCapturedPosition[pieceCapturedPosition.length - recordCount];

        if (lastIndx === "1") {
            idxPosition -= 1;
        }
    }

    return (
        <div className='record-container'>
            <div className='record-container-body'>
                <div className='record-moves'>
                    <span>Record game moves</span>
                    <div style={{ padding: "6px"}}>{recordMoves}</div>
                </div>
                <div className='btns-record-moves'>
                    <button className='record-1' onClick={moveBack}>
                        <Icon.ArrowLeft className='icon-1'/>
                    </button>
                    <button className='record-2' onClick={moveForward}>
                        <Icon.ArrowRight className='icon-2'/>
                    </button>
                    <button className='record-3'>
                        <Icon.Pause className='icon-3'/>
                    </button>
                </div>
                <Chat websocket={websocket} />
            </div>
            <Link to={`/${ID ? `?id=${ID}`:''}`}>
                <button className='record-go-back'>Main page</button>
            </Link>
        </div>
    );
}