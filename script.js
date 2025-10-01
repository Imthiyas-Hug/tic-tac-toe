const gameBoard = (function () {

    let array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    function mark(row, col, value, whoseTurn) {
        array[row][col] = value;
        console.log(array);
    
        if (whoseTurn == 'Player 1') {
            getIndices('Player 2');
        } else {
            getIndices('Player 1');
        }
    }

    return {
        mark
    };

})();

console.log('__00__|__01__|__02__');
console.log('__10__|__11__|__12__');
console.log('  20  |  21  |  22  ');

let player1Choice;
let player2Choice;
let playsFirst;
let row;
let col;
let whoseTurn;

getChoices();
function getChoices() {
    player1Choice = window.prompt('Enter Player 1 Choice: "X" or "O" ').toUpperCase();
    player2Choice = (player1Choice == "X") ? "O" : "X";
    window.alert(`Player 2 Choice is "${player2Choice}"`);
    playsFirst = (player1Choice == "X") ? 'Player 1' : 'Player 2';
    window.alert(`X plays first!`);
    whoseTurn = playsFirst;
    getIndices(whoseTurn);
}

function getIndices(whoseTurn) {
    window.alert(`${whoseTurn} Turn:`);
    row = window.prompt(`(${whoseTurn} Turn) Enter the row number(0,1,2) you want to mark.`);
    col = window.prompt(`(${whoseTurn} Turn) Enter the col number(0,1,2) you want to mark.`);
    if (whoseTurn == 'Player 1') {
        gameBoard.mark(row, col, player1Choice, whoseTurn);
    } else {
        gameBoard.mark(row, col, player2Choice, whoseTurn);
    }
}
