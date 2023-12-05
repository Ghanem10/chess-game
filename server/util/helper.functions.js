
const room = {
    users: [],
    updatePlayer: function(player) {
        return this.users.push(player);
    },
    removePlayer: function(player) {
        return this.users.splice(this.users.indexOf(player), 1);
    },
};

function getOpponentPlayer(id) {
    return room.users.find((oppId) => oppId !== id);
}

function getPlayer(id) {
    return room.users.find((playerId) => playerId === id);
}

function formateDate(message) {
    return {
        message,
        time: new Intl.DateTimeFormat('default', {
            hour: "numeric",
            minute: "numeric",
        }).format(new Date()),
    };
}


export { formateDate, getOpponentPlayer, getPlayer, room };