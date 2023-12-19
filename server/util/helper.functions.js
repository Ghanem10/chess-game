
function formateDate(message, id) {
    return {
        message,
        id,
        time: new Intl.DateTimeFormat('default', {
            hour: "numeric",
            minute: "numeric",
        }).format(new Date()),
    };
}


export { formateDate };