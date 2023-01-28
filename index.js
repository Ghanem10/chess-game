


const s = 'Hello';
let t = '';

for (let i = 0; i < s.length; i++) {
    if (s[i] === 'l') {
        t = s.replace(/l/g, 'w');
    }
}
console.log(t)