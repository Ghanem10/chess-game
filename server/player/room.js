
function createRoom(rooms, message) {

    const roomID = message._ID;
    const p1 = message.player1;
    const p2 = message.player2;

    // Set a room for players with _ID
    rooms.set(roomID, { 
        player1: p1, player2: p2
    });
}

export {
    createRoom,
};