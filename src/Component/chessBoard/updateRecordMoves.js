
export default function updateRecordMoves(state, setMoves, x, y, cur, play, opponentCap) {
    state.squares.map(row => {
        row.forEach(p => {
            if (p.x === x && p.y === y) {
                let capturePos = "";
                if (opponentCap) {
                    capturePos = "x";
                }
                const moves = ` ${checkPieceType(cur)}${capturePos}${p.position}`;
                if (play) {
                    setMoves((prePos) => [...prePos, moves]);
                }
            }
        });
    });
}

function checkPieceType(cur) {
    let piece = "";
    const p = cur.Piece;
    for (let i = 0; i < p.length; i++) {
        const charPieces = ['p','r','k','q','b','kn'];
        if (p.startsWith(charPieces[i])) {
            piece = charPieces[i];            
        }
    }
    return piece;
}