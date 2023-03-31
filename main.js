const morpionCase = document.querySelectorAll('[data-morpionCase]');
// const morpionCase = document.getElementsByClassName('[morpionCase]');
const turn = document.getElementById('turn');
const winStatus = document.getElementById('winStatus');
const playerOne = 'X';
const playerTwo = 'O';
let playerTurn = playerOne;

const winsPossibility = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

morpionCase.forEach(morpionCase => {
    morpionCase.addEventListener('click', playGame, { once: true });
});

function playGame(e) {
    e.target.innerHTML = playerTurn;

    if (checkWin(playerTurn)) {
        updateGameStatus("wins" + playerTurn)
        return endGame();
    } else if (checDraw()) {
        updateGameStatus("draw");
        return endGame();
    }

    updateGameStatus(playerTurn);

    playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
}

function checkWin(playerTurn) {
    return winsPossibility.some(combination => {
        return combination.every(index => {
            return morpionCase[index].innerHTML == playerTurn;
        })
    })
}

function checDraw() {
    return [...morpionCase].every(morpionCase => {
       return morpionCase.innerHTML == playerOne || morpionCase.innerHTML == playerTwo; 
    })
}

function updateGameStatus(status) {
    let statusText;

    switch (status){
        case 'X':
            statusText = "Au tour du joueur O";
            break;
        case 'O':
            statusText = "Au tour du joueur X";
            break;
        case 'winsX':
            statusText = "Le joueur X a gagné!";
            break;
        case 'winsO':
            statusText = "Le joueur O a gagné!";
            break;
        case 'draw':
            statusText = "Egalité! Personne n'a gagné!";
            break;
    }

    turn.innerHTML = statusText;
    winStatus.innerHTML = statusText
}

function endGame() {
    document.getElementById('restart').style.display = "flex"
    document.getElementById('restart').style.flexDirection = "column"
    document.getElementById('restart').style.alignItems = "center"
    document.getElementById('restart').style.justifyContent = "center"

    document.getElementById('game').style.display = "none"
}

function reloadGame() {
    window.location.reload()
}
