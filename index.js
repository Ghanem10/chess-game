

// <div>
// </div>

let hash = new Map();

const inserSlash = (element) => {
    for (let i = 0; i < element.length - 1; i++){
        if (!hash.has(element[i])) {
            hash.set(element[i], 1);
        }
        if (hash.has(element[i])){
            if (element[i + 1] !== '/') {
                hash.set('/', element[i + 1]);
            }
        }
    }
    console.log(hash.keys(), hash.values())
}

inserSlash('<div><div>')