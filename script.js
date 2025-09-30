const player1_vs_player2_btn = document.querySelector('.player1-vs-player2');
const player_vs_computer_btn = document.querySelector('.player-vs-computer');
const board_buttons = document.querySelectorAll('.container button');
const first_row = document.querySelectorAll('.first-row button');
const second_row = document.querySelectorAll('.second-row button');
const third_row = document.querySelectorAll('.third-row button');

let playerChoice;
let computerChoice;
player_vs_computer_btn.addEventListener('click', () => {
    playerChoice = window.prompt("Choose 'X' or 'O' ").toUpperCase();
    if (playerChoice == 'X') {

        computerChoice = 'O';
    }
    else {

        computerChoice = 'X';
    }
})

const array = [
    ['', '', ''],

    ['', '', ''],

    ['', '', '']
];

let random_row;
let random_col;

first_row.forEach(button => {
    button.addEventListener('click', (event) => {
        random_row = Math.floor(Math.random() * 3);
        random_col = Math.floor(Math.random() * 3);
        array[0][event.target.dataset.index] = playerChoice;
        button.textContent = playerChoice;
        for (let i = 0; i < 3; i++) {
            if (random_col == event.target.dataset.index) {
                continue;
            }
            random_col = i;
        }
        if(!(array[random_row][random_col]))
            array[random_row][random_col] = computerChoice;
            console.log(array);
        })
})

second_row.forEach(button => {
    button.addEventListener('click', (event) => {
        random_row = Math.floor(Math.random() * 3);
        random_col = Math.floor(Math.random() * 3);
        array[1][event.target.dataset.index] = playerChoice;
        button.textContent = playerChoice;
        array[random_row][random_col] = computerChoice;
        console.log(array)
    })
})

third_row.forEach(button => {
    button.addEventListener('click', (event) => {
        random_row = Math.floor(Math.random() * 3);
        random_col = Math.floor(Math.random() * 3);
        array[2][event.target.dataset.index] = playerChoice;
        button.textContent = playerChoice;
        array[random_row][random_col] = computerChoice;
        console.log(array)
    })
})
console.log(board_buttons)
// board_buttons.forEach(button => {
//     button.addEventListener('click', (event) => {
//         if (random_col == event.target.dataset.index) {
// for (let i = 0; i < 3; i++) {
//     if (random_col == i) {
//         continue;
//     }
//                 random_col = i;
//                 array[random_row][random_col] = computerChoice;
//                 button.textContent = array[random_row][random_col];
//             }
//         }


//     })
// })

