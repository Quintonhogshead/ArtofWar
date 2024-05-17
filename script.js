function toggleRemoved(event) {
    event.target.classList.toggle('removed');
    saveGameState();
    updateCounter();
}

function updateCounter() {
    const totalPieces = document.querySelectorAll('.game-piece').length;
    const removedPieces = document.querySelectorAll('.game-piece.removed').length;
    const remainingPercentage = ((totalPieces - removedPieces) / totalPieces * 100).toFixed(2);
    document.getElementById('counter').textContent = `Remaining units: ${remainingPercentage}%`;
}

function editText(event) {
    event.preventDefault();
    const currentText = event.target.textContent;
    const newText = prompt("Edit text:", currentText);
    if (newText !== null && newText.trim() !== "") {
        event.target.textContent = newText;
        saveGameState();
        updateCounter();
    }
}

function saveGameState() {
    const gamePieces = Array.from(document.querySelectorAll('.game-piece')).map(piece => ({
        text: piece.textContent,
        removed: piece.classList.contains('removed')
    }));
    const headerText = document.querySelector('h1').textContent;
    const counterText = document.getElementById('counter').textContent;
    const state = {
        gamePieces: gamePieces,
        headerText: headerText,
        counterText: counterText
    };
    localStorage.setItem(window.location.pathname, JSON.stringify(state));
}

function loadGameState() {
    const savedState = localStorage.getItem(window.location.pathname);
    if (savedState) {
        const state = JSON.parse(savedState);
        document.querySelector('h1').textContent = state.headerText;
        document.getElementById('counter').textContent = state.counterText;

        const container = document.getElementById('game-pieces-container');
        container.innerHTML = '';
        state.gamePieces.forEach(piece => {
            const div = document.createElement('div');
            div.className = 'game-piece';
            div.textContent = piece.text;
            if (piece.removed) {
                div.classList.add('removed');
            }
            div.onclick = toggleRemoved;
            div.oncontextmenu = editText;
            container.appendChild(div);
        });
        updateCounter();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadGameState();

    // Make header and counter editable
    document.querySelector('h1').oncontextmenu = editText;
    document.getElementById('counter').oncontextmenu = editText;

    // Initialize game pieces if there's no saved state
    const savedState = localStorage.getItem(window.location.pathname);
    if (!savedState) {
        const initialGamePieces = [
            'Piece 1',
            'Piece 2',
            'Piece 3',
            'Piece 4',
            'Piece 5'
        ];

        const container = document.getElementById('game-pieces-container');
        initialGamePieces.forEach(piece => {
            const div = document.createElement('div');
            div.className = 'game-piece';
            div.textContent = piece;
            div.onclick = toggleRemoved;
            div.oncontextmenu = editText;
            container.appendChild(div);
        });
        updateCounter();
        saveGameState();
    }
});
