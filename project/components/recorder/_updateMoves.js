
export default function updateRecordMoves(state, idxCount, setIdxCount, setRecord, x, y, cur, oppCap) {
    
    state.squares.map(row => {
        row.forEach(p => {
            if (p.x === x && p.y === y) {
                let capturePos = oppCap ? "x" : "";
                const moves = ` 
                    ${idxCount}. ${checkPieceType(cur)}${capturePos}${p.position}, 
                `;
                
                setRecord((prePos) => [...prePos, moves]);
                setIdxCount(pre => pre + 1);
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