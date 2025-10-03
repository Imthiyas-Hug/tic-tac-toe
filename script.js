const gameBoard = (function () {

    let array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    let emptyArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    let leftDiagonal;
    let rightDiagonal;

    let firstColumn = [];
    let secondColumn = [];
    let thirdColumn = [];

    let p1FirstRowCheck;
    let p1SecondRowCheck;
    let p1ThirdRowCheck;

    let p2FirstRowCheck;
    let p2SecondRowCheck;
    let p2ThirdRowCheck;

    let p1FirstColCheck;
    let p1SecondColCheck;
    let p1ThirdColCheck;

    let p2FirstColCheck;
    let p2SecondColCheck;
    let p2ThirdColCheck;

    let p1LeftDiagonalCheck;
    let p1RightDiagonalCheck;

    let p2LeftDiagonalCheck;
    let p2RightDiagonalCheck;

    let player1Winner;
    let player2Winner;

    function arrayNotFull() {
        return array.some(row => row.some(cell => cell == ''));
    }

    function mark(row, col, value, whoseTurn, player1Choice, opponentChoice, whoVersusWho) {

        //assigning value
        if (arrayNotFull() && (!player1Winner) && (!player2Winner)) {   
            if (array[row][col] == '') {
                array[row][col] = value;
                console.table(array);
            }
            else{
                if(whoseTurn == 'Computer') {
                    getComputerIndices(whoseTurn);
                }
                else{
                    alert('Spot taken Already! Mark Again.');
                    getIndices(whoseTurn);
                }
  
            }
  
        }

        //checking rows for player1 value 
        p1FirstRowCheck = array[0].every(cell => cell == player1Choice);
        p1SecondRowCheck = array[1].every(cell => cell == player1Choice);
        p1ThirdRowCheck = array[2].every(cell => cell == player1Choice);

        //checking rows for player2/computer value 
        p2FirstRowCheck = array[0].every(cell => cell == opponentChoice);
        p2SecondRowCheck = array[1].every(cell => cell == opponentChoice);
        p2ThirdRowCheck = array[2].every(cell => cell == opponentChoice);

        //extracting each column value and assigning
        firstColumn = array.map(row => row[0]);
        secondColumn = array.map(row => row[1]);
        thirdColumn = array.map(row => row[2]);

        //checking columns for player1 value 
        p1FirstColCheck = firstColumn.every(cell => cell == player1Choice);
        p1SecondColCheck = secondColumn.every(cell => cell == player1Choice);
        p1ThirdColCheck = thirdColumn.every(cell => cell == player1Choice);

        //checking columns for player2/computer value 
        p2FirstColCheck = firstColumn.every(cell => cell == opponentChoice);
        p2SecondColCheck = secondColumn.every(cell => cell == opponentChoice);
        p2ThirdColCheck = thirdColumn.every(cell => cell == opponentChoice);

        //assigning diagonal values
        leftDiagonal = [array[0][0], array[1][1], array[2][2]];
        rightDiagonal = [array[0][2], array[1][1], array[2][0]];

        //checking diagonal for player1 value
        p1LeftDiagonalCheck = leftDiagonal.every(cell => cell == player1Choice);
        p1RightDiagonalCheck = rightDiagonal.every(cell => cell == player1Choice);

        //checking diagonal for player2/computer value
        p2LeftDiagonalCheck = leftDiagonal.every(cell => cell == opponentChoice);
        p2RightDiagonalCheck = rightDiagonal.every(cell => cell == opponentChoice);

        //checking player1 result
        player1Winner = (p1FirstRowCheck || p1SecondRowCheck || p1ThirdRowCheck)
            || (p1FirstColCheck || p1SecondColCheck || p1ThirdColCheck)
            || (p1LeftDiagonalCheck || p1RightDiagonalCheck) ? true : false;

        //checking player2/computer result
        player2Winner = ((p2FirstRowCheck || p2SecondRowCheck || p2ThirdRowCheck)
            || (p2FirstColCheck || p2SecondColCheck || p2ThirdColCheck)
            || (p2LeftDiagonalCheck || p2RightDiagonalCheck)) ? true : false;

        //alerting player1 result
        if (player1Winner) {
            alert('Player 1 wins!');
            console.log('Player 1 wins!');
            return;
        }

        //alerting player2 result
        if (player2Winner && whoseTurn == 'Player 2') {
            alert('Player 2 wins!');
            console.log('Player 2 wins!');
            return;
        }

        //alerting computer result
        if (player2Winner && whoseTurn == 'Computer') {
            alert('Computer wins!');
            console.log('Computer wins!');
            return;
        }

        //getting row and col values for each turn 
        if (arrayNotFull() && (!player1Winner) && (!player2Winner)) {
            if (whoseTurn == 'Player 1') {
                if (whoVersusWho == '1') {
                    getIndices('Player 2');
                }
                else {
                    getIndices('Computer')
                }
            }
            else if (whoseTurn == 'Player 2') {
                getIndices('Player 1');
            }
            else if (whoseTurn == 'Computer') {
                getIndices('Player 1');
            }
        }

        //checking for match tie
        if ((!arrayNotFull()) && (!player1Winner) && (!player2Winner)) {
            alert('Match Tie!');
            console.log('Match Tie!');
            return;
        }
    }

    return {
        mark
    };

})();

let player1Choice;
let player2Choice;
let computerChoice;
let playsFirst;
let row;
let col;
let whoseTurn;

alert('Choose who do you want to play with!');
let whoVersusWho = window.prompt('Computer(0) or Player(1)');

const input = ['0', '1', '2'];
const marker = ['X', 'O'];

function getChoices() {
    if (whoVersusWho == '1') {
        player1Choice = window.prompt('Enter Player 1 Choice: "X" or "O" ').toUpperCase();
        if (!(marker.includes(player1Choice))) {
            alert('Invalid Choice! Enter Again.')
            getChoices();
        }
        player2Choice = (player1Choice == "X") ? "O" : "X";
        window.alert(`Player 2 Choice is "${player2Choice}"`);
        playsFirst = (player1Choice == "X") ? 'Player 1' : 'Player 2';
        window.alert(`X plays first!`);
        whoseTurn = playsFirst;
        getIndices(whoseTurn);
    }
    else {
        player1Choice = window.prompt('Enter Player 1 Choice: "X" or "O" ').toUpperCase();
        if (!(marker.includes(player1Choice))) {
            alert('Invalid Choice! Enter Again.')
            getChoices();
        }
        computerChoice = (player1Choice == "X") ? "O" : "X";
        window.alert(`Computer Choice is "${computerChoice}"`);
        playsFirst = (player1Choice == "X") ? 'Player 1' : 'Computer';
        window.alert(`X plays first!`);
        whoseTurn = playsFirst;
        getIndices(whoseTurn);
    }
}
getChoices();

function getIndices(whoseTurn) {
    window.alert(`${whoseTurn} Turn:`);
    console.log(whoseTurn);
    if (whoseTurn == 'Player 1' || whoseTurn == 'Player 2') {
        row = window.prompt(`(${whoseTurn} Turn) Enter the row number(0,1,2) you want to mark.`);
        col = window.prompt(`(${whoseTurn} Turn) Enter the col number(0,1,2) you want to mark.`);
    }
    if (whoseTurn == 'Computer') {
        row = Math.floor(Math.random() * 3).toString();
        col = Math.floor(Math.random() * 3).toString();
    }
    if (!(input.includes(row)) || !(input.includes(col))) {
      if(row == null || col == null) {
        return;
      }
        alert('Invalid Input! Enter Again.');
        getIndices(whoseTurn);
    }
    if (whoseTurn == 'Player 1') {
      if(whoVersusWho == '1'){
        gameBoard.mark(row, col, player1Choice, whoseTurn, player1Choice, player2Choice,whoVersusWho);
      }
      else{
        gameBoard.mark(row, col, player1Choice, whoseTurn, player1Choice, computerChoice, whoVersusWho);
      }
        
    }
    else if (whoseTurn == 'Player 2') {
        gameBoard.mark(row, col, player2Choice, whoseTurn, player1Choice, player2Choice,whoVersusWho);
    }
    else if (whoseTurn == 'Computer') {
        gameBoard.mark(row, col, computerChoice, whoseTurn, player1Choice, computerChoice, whoVersusWho);
    }
}

function getComputerIndices(whoseTurn) {
      row = Math.floor(Math.random() * 3).toString();
      col = Math.floor(Math.random() * 3).toString();
      gameBoard.mark(row, col, computerChoice, whoseTurn, player1Choice, computerChoice, whoVersusWho);
  }