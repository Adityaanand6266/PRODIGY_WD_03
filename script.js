let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function playerMove(index) {
    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        renderBoard();
        checkWinner();
        if (!gameOver) {
            setTimeout(aiMove, 500); // AI makes move after a delay
        }
    }
}

function aiMove() {
    let emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let aiIndex = emptyCells[randomIndex];
    board[aiIndex] = 'O';

    renderBoard();
    checkWinner();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            document.getElementById('status').innerText = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        document.getElementById('status').innerText = 'It\'s a draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `${currentPlayer}'s turn`;
}

function renderBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName('cell')[i].innerText = board[i];
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('status').innerText = `${currentPlayer}'s turn`;
    renderBoard();
}
