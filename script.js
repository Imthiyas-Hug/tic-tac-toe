let player1Choice;
let player2Choice;
let computerChoice;
let row;
let col;
let cellId;
let whoseTurn;
let whoVersusWho;
let turn = false;

const cells = document.querySelectorAll(".cell");
const playWithPcbtn = document.querySelector("#playWithComputer-btn");
const playWithFrndbtn = document.querySelector("#playWithFrnd-btn");
const markerBtns = document.querySelectorAll(".marker-btn button");
const markerDialog = document.querySelector("#marker-dialog");
const playerMarker = document.querySelector('#player-marker')
const resultDialog = document.querySelector("#result-dialog");
const playerNameDialog = document.querySelector("#playerName-dialog");
const playersNameDialog = document.querySelector("#playersName-dialog");
const playFirstDialog = document.querySelector("#playFirst-dialog");
const result = document.querySelector("#result");
const restartBtn = document.querySelector("#restart-btn");
const playAgainbBtn = document.querySelector("#playAgain-btn");
const playerNameSubmitBtn = document.querySelector("#playerNameSubmit-btn");
const playersNameSubmitBtn = document.querySelector("#playersNameSubmit-btn");
const board = document.querySelector('.board');
const playerName = document.querySelector('#playerName');
const player1Name = document.querySelector('#player1Name');
const player2Name = document.querySelector('#player2Name');
const player1Status = document.querySelector('.player1-status');
const player2Status = document.querySelector('.player2-status');
const p1Status = document.querySelector('#p1Status');
const p1Marker = document.querySelector('#p1Marker');
const p2Status = document.querySelector('#p2Status');
const p2Marker = document.querySelector('#p2Marker');

const gameBoard = (function () {

    let array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    function resetArray() {
        array = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        player1Winner = false;
        player2Winner = false;
        cells.forEach(cell => {
            cell.textContent = "";
        })
    }

    let p1Name;
    let p2Name;

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

    function mark(row, col, value, whoseTurn, player1Choice, opponentChoice, cellId) {

        //assigning value
        if (arrayNotFull() && (!player1Winner) && (!player2Winner)) {
            if (array[row][col] == '') {
                array[row][col] = value;
                cells[cellId].textContent = array[row][col];
                cells[cellId].classList.remove('marked');
                void cells[cellId].offsetWidth; // restart animation
                cells[cellId].classList.add('marked');
                console.table(array);
            }
            else {
                if (whoseTurn == 'Computer') {
                    getComputerIndices(whoseTurn);
                }
                else {
                    return;
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
            result.textContent = `${gameBoard.p1Name} Wins!`;
            setTimeout(() => {
                resultDialog.showModal();
            }, 800);
            console.log('Player 1 wins!');
            return;
        }

        //alerting player2 result
        if (player2Winner && whoseTurn == 'Player 2') {
            result.textContent = `${gameBoard.p2Name} Wins!`;
            setTimeout(() => {
                resultDialog.showModal();
            }, 800);
            console.log('Player 2 wins!');
            return;
        }

        //alerting computer result
        if (player2Winner && whoseTurn == 'Computer') {
            result.textContent = 'Computer wins!';
            setTimeout(() => {
                resultDialog.showModal();
            }, 800);
            console.log('Computer wins!');
            return;
        }

        //getting row and col values for each turn 
        if (arrayNotFull() && (!player1Winner) && (!player2Winner)) {
            if (whoseTurn == 'Player 1') {
                if (whoVersusWho == '1') {
                    // window.alert('Player 2 Turn:');
                }
                else {
                    setTimeout(() => {
                        getComputerIndices('Computer');
                    }, 800);
                }
            }
            else if (whoseTurn == 'Player 2') {
                // window.alert('Player 1 Turn:');
            }
            else if (whoseTurn == 'Computer') {
                // window.alert('Player 1 Turn:');
            }
        }

        //checking for match tie
        if ((!arrayNotFull()) && (!player1Winner) && (!player2Winner)) {
            result.textContent = 'Round Tie!';
            setTimeout(() => {
                resultDialog.showModal();
            }, 1000);
            console.log('Match Tie!');
            return;
        }
    }

    return {
        mark, resetArray, p1Name, p2Name
    };

})();


function getIndices(whoseTurn, row, col, cellId) {
    console.log(whoseTurn);
    if (whoseTurn == 'Player 1') {
        if (whoVersusWho == '1') {
            gameBoard.mark(row, col, player1Choice, whoseTurn, player1Choice, player2Choice, cellId);
        }
        else {
            gameBoard.mark(row, col, player1Choice, whoseTurn, player1Choice, computerChoice, cellId);
        }
    }
    else if (whoseTurn == 'Player 2') {
        gameBoard.mark(row, col, player2Choice, whoseTurn, player1Choice, player2Choice, cellId);
    }
    else if (whoseTurn == 'Computer') {
        gameBoard.mark(row, col, computerChoice, whoseTurn, player1Choice, computerChoice, cellId);
    }
}

function getComputerIndices(whoseTurn) {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
    if (row == 0 && col == 0) {
        cellId = '0';
    }
    else if (row == 0 && col == 1) {
        cellId = '1';
    }
    else if (row == 0 && col == 2) {
        cellId = '2';
    }
    else if (row == 1 && col == 0) {
        cellId = '3';
    }
    else if (row == 1 && col == 1) {
        cellId = '4';
    }
    else if (row == 1 && col == 2) {
        cellId = '5';
    }
    else if (row == 2 && col == 0) {
        cellId = '6';
    }
    else if (row == 2 && col == 1) {
        cellId = '7';
    }
    else if (row == 2 && col == 2) {
        cellId = '8';
    }
    console.log(row, col, cellId)
    gameBoard.mark(row, col, computerChoice, whoseTurn, player1Choice, computerChoice, cellId);
}

playWithPcbtn.addEventListener('click', (event) => {
    whoVersusWho = event.target.dataset.id;
    playerNameDialog.showModal();

})
playWithFrndbtn.addEventListener('click', (event) => {
    whoVersusWho = event.target.dataset.id;
    playersNameDialog.showModal();
})
playerNameSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    gameBoard.p1Name = playerName.value;
    p1Status.textContent = playerName.value;
    p2Status.textContent = 'Computer';
    if (gameBoard.p1Name) {
        playerNameDialog.close();
        playWithPcbtn.style.display = 'none';
        playWithFrndbtn.style.display = 'none';
        board.style.display = "flex";
        playerMarker.textContent = `${gameBoard.p1Name} Marker:`
        markerDialog.showModal();
    }
})
playersNameSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    gameBoard.p1Name = player1Name.value;
    p1Status.textContent = player1Name.value;
    gameBoard.p2Name = player2Name.value;
    p2Status.textContent = player2Name.value;
    gameBoard.p1Name = player1Name.value;
    gameBoard.p2Name = player2Name.value;
    if (gameBoard.p1Name && gameBoard.p2Name) {
        playersNameDialog.close();
        playWithPcbtn.style.display = 'none';
        playWithFrndbtn.style.display = 'none';
        board.style.display = "flex";
        playerMarker.textContent = `${gameBoard.p1Name} Marker:`
        markerDialog.showModal();
    }
})

markerBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        player1Choice = event.target.textContent;
        markerDialog.close();
        p1Marker.textContent = event.target.textContent;
        p2Marker.textContent = (player1Choice == "X") ? "O" : "X";
        player1Status.style.display = 'flex';
        player2Status.style.display = 'flex';
        restartBtn.style.display = 'block';
        if (whoVersusWho == '1') {
            player2Choice = (player1Choice == "X") ? "O" : "X";
            playFirstDialog.showModal();
            whoseTurn = (player1Choice == "X") ? 'Player 1' : 'Player 2';
            turn = true;
        }
        else {
            computerChoice = (player1Choice == "X") ? "O" : "X";
            playFirstDialog.showModal();
            whoseTurn = (player1Choice == "X") ? 'Player 1' : 'Computer';
            if (whoseTurn == "Computer") {
                setTimeout(() => {
                    getComputerIndices(whoseTurn);
                }, 1000);
            }
        }
    })
})
cells.forEach(cell => {
    cell.addEventListener('click', (event) => {
        cellId = event.target.id;
        row = Number(event.target.dataset.row);
        col = Number(event.target.dataset.col);
        if (whoseTurn == 'Computer' && whoVersusWho == '0') {
            whoseTurn = 'Player 1';
        }
        if (whoseTurn == 'Player 1' && whoVersusWho == '1' && (!turn)) {
            whoseTurn = 'Player 2';
        }
        else if (whoseTurn == 'Player 2' && whoVersusWho == '1' && (!turn)) {
            whoseTurn = 'Player 1';
        }
        console.log(whoseTurn);
        setTimeout(() => {
            getIndices(whoseTurn, row, col, cellId);
        }, 300);
        turn = false;
    })
})
restartBtn.addEventListener('click', () => {
    gameBoard.resetArray();
    resultDialog.close();
})
playAgainbBtn.addEventListener('click', () => {
    window.location.reload();
})

function closeDialog() {
    playFirstDialog.close();
}