//DEFINIG GLOBAL VARIABLES

let fields = [];
let gameOver = false;
let currentShape = 'x';
let winner;

//MAIN FUNCTIONALITY
function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'x') {
            currentShape = 'circle';
            document.getElementById('player-1').classList.add('player-inactive');
            document.getElementById('player-2').classList.remove('player-inactive');
        } else {
            currentShape = 'x'
            document.getElementById('player-1').classList.remove('player-inactive');
            document.getElementById('player-2').classList.add('player-inactive');
        }
        fields[id] = currentShape;
        draw();
        checkForWin();
    }
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }
        if (fields[i] == 'x') {
            document.getElementById('x-' + i).classList.remove('d-none');
        }
    }
}


function checkifNoWinner(winner) {
    if (noWinnerAndFieldsFilled(winner)) {
        gameOver == true;
        document.getElementById('game-over-text').innerHTML = 'IT´S A DRAW'
        setTimeout(function () {
            document.getElementById('game-over-container').classList.remove('d-none');
            document.getElementById('game-container').classList.add('d-none');
        }, 1250)
    }
}


function checkForWin() {
    winConditionsAndDrawLine();
    if (winner) {
        gameOver = true;
        if (currentShape == 'circle') {
            showWinnerAlertAndCircleIcon();
        } else {
            showWinnerAlertAndXIcon();
        }
        setTimeout(function () {
            document.getElementById('game-over-container').classList.remove('d-none');
            document.getElementById('game-container').classList.add('d-none');
        }, 1250)
    }
    checkifNoWinner(winner);
}


// HELP FUNCTIONS
function noWinnerAndFieldsFilled(winner) {
    return fields[0] && fields[1] && fields[2] && fields[3] && fields[4] && fields[5] && fields[6] && fields[7] && fields[8] && !winner;
}


function showCircle() {
    return '<img class="winner-img" src="img/circle.png">';
}


function showX() {
    return '<img class="winner-img"src="img/x.png">';
}


function showWinnerAlertAndCircleIcon() {
    document.getElementById('game-over-text').innerHTML = 'WINNER: PLAYER 1'
    document.getElementById('winner-img').innerHTML = showCircle();
}


function showWinnerAlertAndXIcon() {
    document.getElementById('game-over-text').innerHTML = 'WINNER: PLAYER 2'
    document.getElementById('winner-img').innerHTML += showX();
}


function winConditionsAndDrawLine() {
    // row 1
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-1').style.transform = 'scaleX(1)';
    }
    // row 2
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-2').style.transform = 'scaleX(1)';

    }
    // row 3
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-3').style.transform = 'scaleX(1)';

    }
    // column 1
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1)';

    }
    // column 2
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1)';

    }
    // column 3
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-6').style.transform = 'rotate(90deg) scaleX(1)';

    }
    // diagonal 1
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-7').style.transform = 'rotate(45deg)scaleX(1.2)';

    }
    // diagonal 2
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-8').style.transform = 'rotate(-45deg)scaleX(1.2)';

    }
}