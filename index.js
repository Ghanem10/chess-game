let x = ['1','2','3','4','5','6'];


for (let i = 0; i < x.length; i++){

    switch(x[i]) {
        case '1':
            console.log('x is: ', x[i]);
            break;
        case  '2':
            console.log(x[i] = '22')
            break;
        case '3':
            console.log('x is: ', x[i]);
            break;
        case '4':
            console.log('x is: ', x[i]);
            break;
        default:
            console.log('well, there is nothing to display')
    }
}