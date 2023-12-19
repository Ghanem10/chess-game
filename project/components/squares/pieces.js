const initialstate = [];

export const addChessPieces = () => {
    for (let i = 0; i < 8; i++) {
        initialstate.push({
            image: './pawn-b.png', 
            x: i, y: 1, 
            Piece: 'pawn', 
            team: 'black',
            possibleMoves: [],
            EnpassantMove: false,
        });
        initialstate.push({
            image: './pawn-w.png', 
            x: i,y: 6, 
            Piece: 'pawn', 
            team: 'white',
            possibleMoves: [],
            EnpassantMove: false,
        });
    }

    for (let k = 0; k < 8; k++) {
        const pieces = [
            'rock', 'knight', 'bishop', 'queen', 
            'king','bishop', 'knight', 'rock'
        ];

        if (pieces[k] === "king") {
            initialstate.push({
                image: `./${pieces[k]}-b.png`, 
                x: k, 
                y: 0, 
                possibleMoves: [],
                Piece: `${pieces[k]}`, 
                hasmoved: false,
                isCaslt: false,
                team: 'black',
            });
            initialstate.push({
                image: `./${pieces[k]}-w.png`, 
                x: k, y: 7, 
                possibleMoves: [],
                Piece: `${pieces[k]}`,
                hasmoved: false,
                isCaslt: false,
                team: 'white',
            });
        }

        if (pieces[k] === "rock" || pieces[k] === "king") {
            initialstate.push({
                image: `./${pieces[k]}-b.png`, 
                x: k, 
                y: 0, 
                possibleMoves: [],
                Piece: `${pieces[k]}`, 
                hasmoved: false,
                team: 'black',
            });
            initialstate.push({
                image: `./${pieces[k]}-w.png`, 
                x: k, y: 7, 
                possibleMoves: [],
                Piece: `${pieces[k]}`, 
                hasmoved: false,
                team: 'white',
            });
        } else {
            initialstate.push({
                image: `./${pieces[k]}-b.png`, 
                x: k, 
                y: 0, 
                possibleMoves: [],
                Piece: `${pieces[k]}`, 
                team: 'black',
            });
            initialstate.push({
                image: `./${pieces[k]}-w.png`, 
                x: k, y: 7, 
                possibleMoves: [],
                Piece: `${pieces[k]}`, 
                team: 'white',
            });
        }
    }
    
    return initialstate;
};