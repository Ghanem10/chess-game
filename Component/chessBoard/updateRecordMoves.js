let count = 1;

export default function updateRecordMoves(state, setRecord, x, y, cur, oppCap) {
    
    state.squares.map(row => {
        row.forEach(p => {
            if (p.x === x && p.y === y) {
                
                let capturePos = oppCap ? "x" : "";
                const moves = ` 
                    ${count}. ${checkPieceType(cur)}${capturePos}${p.position}, 
                `;
                
                setRecord((prePos) => [...prePos, moves]);
                count++;
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