
export default class piecesRules {

    isOccupied(previousX, previousY, x, y, type, team, occupied) {

        if (type === 'pawn' && team === 'white') {
            if (previousY === 6) {
                if (previousX === x && ((previousY - y === 1 || previousY - y === 2))) {
                    console.log(`type: ${type}, Its valid position`);
                    return true;
                }
            }else {
                if (previousX === x && (previousY - y === 1)) {
                    return true;
                }
            }
        }
        if (type === 'pawn' && team === 'black') {
            if (previousY === 1) {
                if (previousX === x && ((y - previousY === 1 || y - previousY === 2))) {
                    console.log(`type: ${type}, Its valid position`);
                    return true;
                }
            }else {
                if (previousX === x && (y - previousY === 1)) {
                    return true;
                }
            }
        }
        return false;
    }
}