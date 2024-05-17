function enableDragAndDrop() {
    const container = document.getElementById('game-pieces-container');
    const draggables = document.querySelectorAll('.game-piece');
    
    draggables.forEach(draggable => {
        draggable.setAttribute('draggable', true);
        
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            saveGameState(window.location.pathname.includes('player1') ? 'player1' : 'player2');
        });
    });
    
    container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const dragging = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(dragging);
        } else {
            container.insertBefore(dragging, afterElement);
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.game-piece:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

document.addEventListener('DOMContentLoaded', () => {
    const storageKey = window.location.pathname.includes('player1') ? 'player1' : 'player2';
    loadGameState(storageKey);

    // Make header and counter editable
    document.querySelector('h1').oncontextmenu = editText;
    document.getElementById('counter').oncontextmenu = editText;

    // Initialize game pieces if there's no saved state
    if (!localStorage.getItem(storageKey)) {
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
            div.className = 'game-piece draggable';
            div.textContent = piece;
            div.onclick = toggleRemoved;
            div.oncontextmenu = editText;
            container.appendChild(div);
        });
        updateCounter();
        saveGameState(storageKey);
    }

    enableDragAndDrop();
});
