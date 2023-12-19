
export default class ClonePieces {
    constructor(pieces) {
        this.pieces = pieces;
    }
    
    clone() {
        return this.pieces.map((t) => ({ ...t }));
    }
}