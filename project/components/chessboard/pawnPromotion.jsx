import React, { forwardRef } from "react";
import { samePosition, Team, Type } from "../lib/movement/constants/functions";

export const PawnPromotion = forwardRef((props, ref) => {

    let {
        x, y,
        pawnPromotion,
        setPawnPromotion,
        piece
    } = props;

    const promotPawn = (PieceType) => {
        const updatePromotedPieces = piece.reduce((result, p) => {
            const promotionPawnTeam = p.team === Team.WHITE ? "w" : "b";

            if (samePosition(p, x, y)) {
                p.Piece = PieceType;
                p.image = `${PieceType}-${promotionPawnTeam}.png`;
            }

            result.push(p);
            return result;
        }, []);

        setPawnPromotion(updatePromotedPieces);
        ref.current.classList.add("hide-title");
    };

    const pieceTeamColor = () => {
        if (pawnPromotion) {
            return pawnPromotion.team === Team.WHITE ? "w" : "b";
        }
    };
    
    return (
        <div id="Pawn-promotion" className="hide-title" ref={ref}>
            <div className="body-promotion">
                <div id="PiecesPromotion" 
                    onClick={() => promotPawn(Type.ROCK)} 
                    style={{ backgroundImage: `url(rock-${pieceTeamColor()}.png)`}}
                ></div>
                <div id="PiecesPromotion" 
                    onClick={() => promotPawn(Type.QUEEN)} 
                    style={{ backgroundImage: `url(queen-${pieceTeamColor()}.png)`}}
                ></div>
                <div id="PiecesPromotion" 
                    onClick={() => promotPawn(Type.BISHOP)} 
                    style={{ backgroundImage: `url(bishop-${pieceTeamColor()}.png)`}}
                ></div>
                <div id="PiecesPromotion" 
                    onClick={() => promotPawn(Type.KNIGHT)} 
                    style={{ backgroundImage: `url(knight-${pieceTeamColor()}.png)`}}
                ></div>
            </div>
        </div>
    );
});