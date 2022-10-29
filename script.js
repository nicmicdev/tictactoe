//DEFINIG GLOBAL VARIABLES
let fields = [];
let gameOver = false;
let currentShape = 'x';
let winner;


//MAIN FUNCTIONALITY
function fillShape(id) {
    if (!fields[id] && !gameOver) {
        changePlayer();
        fields[id] = currentShape;
        draw();
        checkForWin();
    }
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            getElement('circle-' + i).classList.remove('d-none');
        }
        if (fields[i] == 'x') {
            getElement('x-' + i).classList.remove('d-none');
        }
    }
}


function checkifNoWinner(winner) {
    if (noWinnerAndFieldsFilled(winner)) {
        gameOver == true;
        getElement('game-over-text').innerHTML = 'IT´S A DRAW'
        setTimeout(function () {
            showEndScreen();
        }, 1250)
    }
}


function checkForWin() {
    ifWinDrawLine();
    if (winner) {
        setGameOverValues();
        showWinner();
        setTimeout(function () {
            showEndScreen();
        }, 1250)
    }
    checkifNoWinner(winner);
}


function restart() {
    gameOver = false;
    fields = [];
    winner = undefined;
    showGameScreen();
    for (let i = 1; i < 9; i++) {
        getElement('line-'+ i).style.transform = 'scaleX(0)';
    }
    for (let i = 0; i < 9; i++) {
        getElement('circle-'+ i).classList.add('d-none');
        getElement('x-'+ i).classList.add('d-none');
    }
}

// HELP FUNCTIONS
function getElement(id) {
    return document.getElementById(id);
}


function changePlayer() {
    if (currentShape == 'x') {
        currentShape = 'circle';
        getElement('player-1').classList.add('player-inactive');
        getElement('player-2').classList.remove('player-inactive');
    } else {
        currentShape = 'x'
        getElement('player-1').classList.remove('player-inactive');
        getElement('player-2').classList.add('player-inactive');
    }
}


function showGameScreen() {
    getElement('game-over-container').classList.add('d-none');
    getElement('game-container').classList.remove('d-none');
    getElement('game-container').style.pointerEvents = 'all';
}

function showEndScreen() {
    getElement('game-over-container').classList.remove('d-none');
    getElement('game-container').classList.add('d-none');
}


function noWinnerAndFieldsFilled(winner) {
    return fields[0] && fields[1] && fields[2] && fields[3] && fields[4] && fields[5] && fields[6] && fields[7] && fields[8] && !winner;
}

function showWinner() {
    if (currentShape == 'circle') {
        showWinnerAlertAndCircleIcon();
    } else {
        showWinnerAlertAndXIcon();
    }
}


function setGameOverValues() {
    gameOver = true;
    document.getElementById('game-container').style.pointerEvents = 'none';
}


function showWinnerAlertAndCircleIcon() {
    getElement('game-over-text').innerHTML = 'WINNER: CIRCLE!'
    getElement('winner-img').innerHTML = showCircle();
}


function showWinnerAlertAndXIcon() {
    getElement('game-over-text').innerHTML = 'WINNER: CROSS!'
    getElement('winner-img').innerHTML = showX();
}


function ifWinDrawLine() {
    checkHorizontal();
    checkVertical();
    checkDiagonal();
}


function checkHorizontal() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        getElement('line-1').style.transform = 'scaleX(1)';
    }
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        getElement('line-2').style.transform = 'scaleX(1)';
    }
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        getElement('line-3').style.transform = 'scaleX(1)';
    }
}

function checkVertical() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        getElement('line-4').style.transform = 'rotate(90deg) scaleX(1)';
    }
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        getElement('line-5').style.transform = 'rotate(90deg) scaleX(1)';
    }
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        getElement('line-6').style.transform = 'rotate(90deg) scaleX(1)';
    }
}


function checkDiagonal() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        getElement('line-7').style.transform = 'rotate(45deg)scaleX(1.2)';

    }
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        getElement('line-8').style.transform = 'rotate(-45deg)scaleX(1.2)';
    }
}

//TEMPLATE FUNCTIONS
function showCircle() {
    return '<img class="winner-img" src="img/circle.png">';
}


function showX() {
    return '<img class="winner-img"src="img/x.png">';
}
