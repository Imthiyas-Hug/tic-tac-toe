const p1 = window.prompt('Player1: Enter X or O').toLowerCase();
let p2;
let playFirst = 'x';
let playSecond = 'o';
let mark = '';

const p1Choice = document.querySelector('.player1-choice')
p1Choice.textContent = p1;

const p2Choice = document.querySelector('.player2-choice')
p2Choice.textContent = p2;

const boardButtons = document.querySelectorAll('.container button');
boardButtons.forEach(button => {
   
    button.addEventListener('click', () => {
        if(mark == ''){
            button.textContent = 'x';
            mark = 'o';
        }
        else if(mark == 'o'){
            button.textContent = 'o';
            mark = 'x';
        }
        else if(mark == 'x'){
            button.textContent = 'x';
            mark = 'o';
        }
    })
})
