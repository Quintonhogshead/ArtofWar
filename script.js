function toggleRemoved(event) {
    event.target.classList.toggle('removed');
    updateCounter();
}

function updateCounter() {
    const totalPieces = document.querySelectorAll('.game-piece').length;
    const removedPieces = document.querySelectorAll('.game-piece.removed').length;
    const remainingPercentage = ((totalPieces - removedPieces) / totalPieces * 100).toFixed(2);
    document.getElementById('counter').textContent = `Remaining units: ${remainingPercentage}%`;
}
