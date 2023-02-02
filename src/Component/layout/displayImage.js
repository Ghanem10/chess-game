
export default function displayPieces(initialstate) {

    for (let i = 0; i < 8; i++) {
        initialstate.push({image: './black-pawn-b.png', x: 1, y: i });
        initialstate.push({image: './white-pawn-w.png', x: 6, y: i });
    }

    for (let k = 0; k < 8; k++) {
        const pieces = [
            'rock', 'knight', 'bishop', 'queen', 
            'king','bishop', 'knight', 'rock'
        ];
        
        initialstate.push({image: `./black-${pieces[k]}-b.png`, x: 0, y: k });
        initialstate.push({image: `./white-${pieces[k]}-w.png`, x: 7, y: k });
    }
    
    return initialstate;
}