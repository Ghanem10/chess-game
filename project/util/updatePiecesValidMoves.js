export const updatePieceValidMove = (s, b, c) => {
    const m = s?.some(a => a.x === b && a.y === c);
    return m ? true : false;
}