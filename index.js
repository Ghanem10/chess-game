

const sun = [];
const Numbers_Verticlly = ['1','2','3','4','5','6','7','8'];
const Chars_Horizontally = ['a','b','c','d','e','f','g','h'];

function call() {

    const Board = [];
    for (let x = Numbers_Verticlly.length - 1; x >= 0; x--) {
        let square = [];
        for (let y = 0; y < Chars_Horizontally.length; y++) {
            square.push([Numbers_Verticlly[x] + Chars_Horizontally[y]]);
            console.log(Numbers_Verticlly[x] + Chars_Horizontally[y])
        }
        Board.push(square);
    }
    console.log(Board)
}

call();