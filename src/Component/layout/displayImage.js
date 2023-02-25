
export default function displayPieces(initialstate) {

    for (let i = 0; i < 8; i++) {
        initialstate.push({image: './black-pawn-b.png', x: i, y: 1 });
        initialstate.push({image: './white-pawn-w.png', x: i, y: 6 });
    }

    for (let k = 0; k < 8; k++) {
        const pieces = [
            'rock', 'knight', 'bishop', 'queen', 
            'king','bishop', 'knight', 'rock'
        ];
        
        initialstate.push({image: `./black-${pieces[k]}-b.png`, x: k, y: 0 });
        initialstate.push({image: `./white-${pieces[k]}-w.png`, x: k, y: 7 });
    }
    
    return initialstate;
}