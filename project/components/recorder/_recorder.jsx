import React, { useState } from 'react';

import * as Icon from 'react-bootstrap-icons'

import ChatComponent from '../chatbox/chat';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


export default function RecorderMovesTemplate({ recordMoves, match,
    pieceToPlay, setPieces, ws, pieces, setPauseReview, pauseReview
}) {
    
    // TODO: Add castling and en passant moves to the record moves.
    
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("token")).user;

    const [preBoardPosition, setPreBoardPosition] = useState(null);
    const [index, setIndex] = useState(0);

    const moveToPreviousPosition = () => {
        
        const len = pieceToPlay.length - 1;
        if (!pieceToPlay[len - index]) {
            return;
        }
        
        if (!pauseReview) {
            setPreBoardPosition(pieces);
        }

        setPauseReview(true);

        const dirMove = pieceToPlay[len - index];

        setPieces((pieces) => {
            const updatedPieces = pieces.map((p) => {
                if (
                    p.x === dirMove.nextPosition.x && 
                    p.y === dirMove.nextPosition.y
                    ) {
                    return {
                        ...p,
                        x: dirMove.prePosition.gx,
                        y: dirMove.prePosition.gy
                    };
                }

                return p;
            });
    
            return (dirMove.capture)
                ? [...updatedPieces, dirMove.capture]
                : updatedPieces;
        });

        setIndex(index + 1);
    };

    const moveToNextPosition = () => {
        const len = pieceToPlay.length;

        if (!pieceToPlay[len - index]) {
            return;
        }

        const dirMove = pieceToPlay[len - index];

        setPieces((pieces) => {
            return pieces.map((p) => {
                if (
                    p.x === dirMove.prePosition.gx &&
                    p.y === dirMove.prePosition.gy
                    ) {
                    return {
                        ...p,
                        x: dirMove.nextPosition.x,
                        y: dirMove.nextPosition.y
                    };
                }
                
                return p;
            });
        });

        setIndex(index - 1);
    };

    const returnToPreviousState = () => {
        setPauseReview(false);
        setPieces(preBoardPosition);
        setIndex(0);
    };

    /**
     * @description Update user searching prop that is 
     * set to true when user is searching for a match to
     * play and false when user leaves the match.
    */

    const updateUserSearchingProp = async () => {
        try {
            const id = user._id;
            
            await axios.patch(
                `${import.meta.env.VITE_URL}/user/user-search-status/${id}`, id
            );

            ws.emit("leave-current-room", match);

            navigate("/");
        } catch (error) {
            return error;
        }
    };

    return (
        <div className='record-container'>
            <div className='record-container-body'>
                <div className='record-moves'>
                    <span>Record game moves</span>
                    <div className='record-moves-div'>{recordMoves}</div>
                </div>
                <div className='btns-record-moves'>
                    <button className='record-1' onClick={moveToPreviousPosition}>
                        <Icon.ArrowLeft className='icon-1'/>
                    </button>
                    <button className='record-2' onClick={moveToNextPosition}>
                        <Icon.ArrowRight className='icon-2'/>
                    </button>
                    <button className='record-3' onClick={returnToPreviousState}>
                        <Icon.Pause className='icon-3'/>
                    </button>
                </div>
                <ChatComponent match={match.room} websocket={ws} />
            </div>
            <button 
                className='record-go-back'
                onClick={updateUserSearchingProp}
            >
                Main page
            </button>
        </div>
    );
}