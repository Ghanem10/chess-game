
export default function displayPieces(x) {
    switch(true) {
        case x.slice(-1)[0] == '2':
            x = './white-pawn.png';
            break;
        case x == 'a1':
            x = './white-rock.png';
            break;
        case x == 'b1':
            x = './white-knight.png';
            break;
        case x == 'c1':
            x = './white-bishop.png';
            break;
        case x == 'd1':
            x = './white-queen.png';
            break;
        case x == 'e1':
            x = './white-king.png';
            break;
        case x == 'f1':
            x = './white-bishop.png';
            break;
        case x == 'g1':
            x = './white-knight.png';
            break;
        case x == 'h1':
            x = './white-rock.png';
            break;

        /******** Black Pawn ***********/
        case x.slice(-1)[0] == '7':
            x = './black-pawn.png';
            break;
        case x == 'a8':
            x = './black-rock.png';
            break;
        case x == 'b8':
            x = './black-knight.png';
            break;
        case x == 'c8':
            x = './black-bishop.png';
            break;
        case x == 'd8':
            x = './black-queen.png';
            break;
        case x == 'e8':
            x = './black-king.png';
            break;
        case x == 'f8':
            x = './black-bishop.png';
            break;
        case x == 'g8':
            x = './black-knight.png';
            break;
        case x == 'h8':
            x = './black-rock.png';
            break;
    }
    return x;
}