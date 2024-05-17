document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.game-piece');
    const counter = document.getElementById('counter');
    const addPieceButton = document.getElementById('add-piece');
    const removePieceButton = document.getElementById('remove-piece');
    const gamePiecesContainer = document.querySelector('.game-pieces');

    let totalPieces = pieces.length;
    let activePieces = totalPieces;

    pieces.forEach(piece => {
        piece.addEventListener('click', () => {
            piece.classList.toggle('struck');
            updateCounter();
        });
    });

    function updateCounter() {
        activePieces = document.querySelectorAll('.game-piece:not(.struck)').length;
        const percentage = (activePieces / totalPieces) * 100;
        counter.textContent = `${percentage.toFixed(0)}% remaining`;
    }

    addPieceButton.addEventListener('click', () => {
        const newPiece = document.createElement('div');
        newPiece.className = 'game-piece';
        newPiece.contentEditable = 'true';
        newPiece.textContent = `Piece ${totalPieces + 1}`;
        newPiece.addEventListener('click', () => {
            newPiece.classList.toggle('struck');
            updateCounter();
        });
        gamePiecesContainer.appendChild(newPiece);
        totalPieces++;
        updateCounter();
    });

    removePieceButton.addEventListener('click', () => {
        if (totalPieces > 0) {
            const lastPiece = gamePiecesContainer.lastElementChild;
            gamePiecesContainer.removeChild(lastPiece);
            totalPieces--;
            updateCounter();
        }
    });

    // Initial counter update
    updateCounter();
});

