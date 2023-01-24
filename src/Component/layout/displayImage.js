
export default function displayPieces(x) {
    let temp = '';
    if ((x.slice(-1)[0] == '7') || (x.slice(-1)[0] == '2')) {
        temp = (x.slice(-1)[0] == '7') 
            ? `./black-pawn-b.png` 
            : `./white-pawn-w.png`;
    }else if ((x == 'a8' || x == 'h8') || (x == 'a1' || x == 'h1')) {
        temp = (x == 'a8' || x == 'h8') 
            ? `./black-rock-b.png`
            : `./white-rock-w.png`;
    }else if ((x == 'b8' || x == 'g8') || (x == 'b1' || x == 'g1')) {
        temp = ((x == 'b8' || x == 'g8'))
            ? `./black-knight-b.png`
            : `./white-knight-w.png`;
    }else if ((x == 'c8' || x == 'f8') || x == 'c1' || x == 'f1') {
        temp = (x == 'c8' || x == 'f8')
            ? `./black-bishop-b.png`
            : `./white-bishop-w.png`;
    }else if ((x == 'd8') || (x == 'd1')) {
        temp = (x == 'd8')
            ? `./black-queen-b.png`
            : `./white-queen-w.png`;
    }else if ((x == 'e8') || (x == 'e1')) {
        temp = (x == 'e8')
            ? `./black-king-b.png`
            : `./white-king-w.png`;
    }

    return temp;
}