import React, { useEffect, useState } from 'react';

import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import Chat from '../chatbox/chat';
import updateRecordMoves from './_updateMoves';

import '../../assets/scss/component/_recorder.scss';

// adjust with objs
export default function Recorder(props) {

    const {  
        recordMoves, setRecordMoves, websocket, idxPosition, state, setIdxCount,
        pieces, previousPositions, nextPosition, recodCount, setRecordCount,
        opponent, setPiece, pieceCapturedPosition, setIdxPosition, idxCount
    } = props;

    const [lastPositionIdx, setLastPositionIdx] = useState([]);
    const cloneOpponent = opponent.map((t) => ({ ...t }));
    const searchParams = new URLSearchParams(location.search);
    const ID = searchParams.get("id");

    useEffect(() => {
        websocket.on("message", (msgData) => {
            
            // incoming position from another player
            const { prePosition, nextPosition } = msgData;

            const currentPiece = pieces.find(
                (t) => t.x === prePosition.gx && t.y === prePosition.gy
            );
            
            // -- dec
            updateRecordMoves(
                state, 
                idxCount,
                setIdxCount,
                setRecordMoves,
                nextPosition.x,
                nextPosition.y,
                currentPiece,
                opponent
            );
        });
    }, []);

    const moveBack = () => {

        if (recordMoves.length <= 0 || recodCount < 0) return;

        const lastPositionIdxMove = recordMoves[recordMoves.length - 1];

        setRecordMoves((prevMoves) => prevMoves.slice(0, -1));
        setLastPositionIdx((prevlastPositionIdx) => [...prevlastPositionIdx, lastPositionIdxMove]);

        const prepos = previousPositions[previousPositions.length - recodCount];
        const nextpos = nextPosition[nextPosition.length - recodCount];

        pieces.map((t) => {
        
            if (t.x === nextpos.x && t.y === nextpos.y) {
                t.x = prepos.gx; 
                t.y = prepos.gy;
            }

            return t;
        });

        const lastIndx = pieceCapturedPosition[pieceCapturedPosition.length - recodCount];

        if (lastIndx === "1") {
            const len = cloneOpponent.length;
            setIdxPosition(pre => pre + 1);

            if (idxPosition <= 0 || idxPosition > len) return;
            if (cloneOpponent !== undefined) {
                setPiece((capture) => [...capture, cloneOpponent[len - idxPosition]]);
            }
        }

        setRecordCount(pre => pre + 1);
    }

    const moveForward = () => {
        if (lastPositionIdx.length <= 0) return;
        
        setRecordCount(pre => pre - 1);
        const nextMove = lastPositionIdx[lastPositionIdx.length - 1];

        setLastPositionIdx((prevlastPositionIdx) => prevlastPositionIdx.slice(0, -1));
        setRecordMoves((prevMoves) => [...prevMoves, nextMove]);

        const prepos = previousPositions[previousPositions.length - recodCount];
        const nextpos = nextPosition[nextPosition.length - recodCount];

        if (prepos === undefined) return;

        pieces.map((t) => {
            if (t.x === prepos.gx && t.y === prepos.gy) {
                t.x = nextpos.x; 
                t.y = nextpos.y;
            }

            return t;
        });

        const lastIndx = pieceCapturedPosition[pieceCapturedPosition.length - recodCount];

        if (lastIndx === "1") {
            setIdxPosition(pre => pre - 1);
        }
    }

    return (
        <div className='record-container'>
            <div className='record-container-body'>
                <div className='record-moves'>
                    <span>Record game moves</span>
                    <div>{recordMoves}</div>
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