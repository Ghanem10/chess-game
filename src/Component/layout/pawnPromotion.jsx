import React from "react";
import { samePosition, Type, Team } from "../movement/constants/functions";

export default function PawnPromotion(props) {

    let {
        someX,
        someY,
        pawnPromotion,
        setPawnPromotion,
        titleRef,
        piece
    } = props;

    function promotPawn(PieceType) {
        const updatePromotedPieces = piece.reduce((result, p) => {
            const promotionPawnTeam = p.team === Team.WHITE ? "w" : "b";
            if (samePosition(p, someX, someY)) {
                p.Piece = PieceType;
                p.image = `${PieceType}-${promotionPawnTeam}.png`;
            }
            result.push(p);
            return result;
        }, []);
        setPawnPromotion(updatePromotedPieces);
        titleRef.current.classList.add("hide-title");
    }

    function pieceTeamColor () {
        if (pawnPromotion) {
            return pawnPromotion.team === Team.WHITE ? "w" : "b";
        } else {
            return "w";
          }
    }
    
    return (
        <div id="Pawn-promotion" className="hide-title" ref={titleRef}>
            <div className="body-promotion">
                <div id="PiecesPromotion" onClick={() => promotPawn(Type.ROCK)} style={{ backgroundImage: `url(rock-${pieceTeamColor()}.png)`}}></div>
                <div id="PiecesPromotion" onClick={() => promotPawn(Type.QUEEN)} style={{ backgroundImage: `url(queen-${pieceTeamColor()}.png)`}}></div>
                <div id="PiecesPromotion" onClick={() => promotPawn(Type.BISHOP)} style={{ backgroundImage: `url(bishop-${pieceTeamColor()}.png)`}}></div>
                <div id="PiecesPromotion" onClick={() => promotPawn(Type.KNIGHT)} style={{ backgroundImage: `url(knight-${pieceTeamColor()}.png)`}}></div>
            </div>
        </div>
    );
}