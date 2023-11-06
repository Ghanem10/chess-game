

type ItablesPieces = {
    pawn: number[][];
    knight: number[][];
    bishop: number[][];
    rock: number[][];
    queen: number[][];
    king: number[][];
    king_endGame: number[][];
};

export const evaltable: ItablesPieces = {
    pawn: [ 
        [100, 100, 100, 100, 100, 100, 100, 100],
        [90,  90,  90,  90,  90,  90,  90,  90],
        [80,  80,  80,  80,  80,  80,  80,  80],
        [70,  70,  70,  70,  70,  70,  70,  70],
        [60,  60,  60,  60,  60,  60,  60,  60],
        [50,  50,  50,  50,  50,  50,  50,  50],
        [40,  40,  40,  40,  40,  40,  40,  40],
        [-30, -30, -30, -30, -30, -30, -30, -30],
        [ 0,  0,   0,   0,   0,   0,   0,   0]  
    ],
    
    knight: [
        [-66, -53, -75, -75, -10, -55, -58, -70],
        [ -3,  -6, 100, -36,   4,  62,  -4, -14],
        [ -19,  67,   1,  74,  73,  27,  62,  -2],
        [ 24,  24,  45,  37,  33,  41,  25,  17],
        [ -1,   5,  31,  21,  22,  35,   2,   0],
        [-18,  10,  13,  22,  18,  15,  11, -14],
        [-23, -15,   2,   0,   2,   0, -23, -20],
        [-74, -23, -26, -24, -19, -35, -22, -69]
    ],
    
    bishop: [
        [-59, -78, -82, -76, -23,-107, -37, -50],
        [-11,  20,  35, -42, -39,  31,   2, -22],
        [ -9,  39, -32,  41,  52, -10,  28, -14],
        [ 25,  17,  20,  34,  26,  25,  15,  10],
        [ 13,  10,  17,  23,  17,  16,   0,   7],
        [ 14,  25,  24,  15,   8,  25,  20,  15],
        [ 19,  20,  11,   6,   7,   6,  20,  16],
        [ -7,   2, -15, -12, -14, -15, -10, -10]
    ],
    
    rock: [
        [ 35,  29,  33,   4,  37,  33,  56,  50],
        [ 55,  29,  56,  67,  55,  62,  34,  60],
        [ 19,  35,  28,  33,  45,  27,  25,  15],
        [  0,   5,  16,  13,  18,  -4,  -9,  -6],
        [-28, -35, -16, -21, -13, -29, -46, -30],
        [-42, -28, -42, -25, -25, -35, -26, -46],
        [-53, -38, -31, -26, -29, -43, -44, -53],
        [-30, -24, -18,   5,  -2, -18, -31, -32]
    ],
    
    queen: [
        [  6,   1,  -8,-104,  69,  24,  88,  26],
        [ 14,  32,  60, -10,  20,  76,  57,  24],
        [ -2,  43,  32,  60,  72,  63,  43,   2],
        [  1, -16,  22,  17,  25,  20, -13,  -6],
        [-14, -15,  -2,  -5,  -1, -10, -20, -22],
        [-30,  -6, -13, -11, -16, -11, -16, -27],
        [-36, -18,   0, -19, -15, -15, -21, -38],
        [-39, -30, -31, -13, -31, -36, -34, -42]
    ],
    
    king: [
        [-50, -50, -50, -50, -50, -50, -50, -50],
        [-30, -30,  0,   0,   0,   0,  -30, -30],
        [-30, -10,  20,  30,  30,  20, -10, -30],
        [-30, -10,  30,  40,  40,  30, -10, -30],
        [-30, -10,  30,  40,  40,  30, -10, -30],
        [-30, -10,  20,  30,  30,  20, -10, -30],
        [-30, -30,   0,   0,   0,   0, -30, -30],
        [-50, -50, -50, -50, -50, -50, -50, -50]
    ],

    king_endGame: [
        [-100, -100, -100, -100, -99, -99, -99, -99],
        [-100,  -60, -60,  -60, -60, -60, -60, -100],
        [-100,  -60, -20,  -20, -20, -20, -60, -100],
        [-100,  -60, -20,   10,  10, -20, -60, -100],
        [-100,  -60, -20,   10,  10, -20, -60, -100],
        [-100,  -60, -20,  -20, -20, -20, -60, -100],
        [-100,  -60, -60,  -60, -60, -60, -60, -100],
        [-99, -100, -100, -100, -100, -99, -99, -99]
    ]
};