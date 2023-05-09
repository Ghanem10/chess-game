export function displayPieces(initialstate) {

    for (let i = 0; i < 8; i++) {
        initialstate.push({
            image: './black-pawn-b.png', 
            x: i, y: 1, 
            Piece: 'pawn', 
            team: 'black',
            occupied: true,
            EnpassantMove: false,
            id: `black-pawn-${i}-b` // Add unique ID for each piece
        });
        initialstate.push({
            image: './white-pawn-w.png', 
            x: i,y: 6, 
            Piece: 'pawn', 
            team: 'white',
            occupied: true,
            EnpassantMove: false,
            id: `white-pawn-${i}-w` 
        });
    }

    for (let k = 0; k < 8; k++) {
        const pieces = [
            'rock', 'knight', 'bishop', 'queen', 
            'king','bishop', 'knight', 'rock'
        ];

        initialstate.push({
            image: `./black-${pieces[k]}-b.png`, 
            x: k, 
            y: 0, 
            Piece: `${pieces[k]}`, 
            team: 'black',
            occupied: true,
            id: `black-${pieces[k]}-${k}-b` 
        });
        initialstate.push({
            image: `./white-${pieces[k]}-w.png`, 
            x: k, y: 7, 
            Piece: `${pieces[k]}`, 
            team: 'white',
            occupied: true,
            id: `white-${pieces[k]}-${k}-w` 
        });
    }
    
    return initialstate;
}

export function samePosition(p1, x, y) {
    return p1.x === x && p1.y === y;
}