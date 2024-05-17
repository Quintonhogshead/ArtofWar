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
    localStorage.setItem(window.location.pathname, JSON.stringify(gamePieces));
}

function loadGameState() {
    const savedState = localStorage.getItem(window.location.pathname);
    if (savedState) {
        const gamePieces = JSON.parse(savedState);
        const container = document.getElementById('game-pieces-container');
        container.innerHTML = '';
        gamePieces.forEach(piece => {
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
});

