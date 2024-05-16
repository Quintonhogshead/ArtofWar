# ArtofWar
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gaming Channel Overlay</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Special+Elite&display=swap');
        
        body {
            font-family: 'Orbitron', sans-serif;
            background-color: #1c1f26;
            color: #e7bc25;
            text-align: center;
            padding: 50px;
        }
        h1 {
            color: #e7bc25;
            margin-bottom: 20px;
        }
        #counter {
            color: #e7bc25;
            margin-bottom: 30px;
            font-size: 18px;
            font-family: 'Special Elite', serif;
        }
        .game-piece {
            margin: 5px 0;
            padding: 15px;
            font-size: 20px;
            cursor: pointer;
            transition: color 0.3s, background-color 0.3s;
            background-color: #1a5fe4;
            border-radius: 5px;
            display: flex;
            justify-content: center;
        }
        .game-piece:hover {
            background-color: #1447b2;
        }
        .removed {
            color: #7f7f7f;
            text-decoration: line-through;
            text-decoration-color: #ff0000; /* Blood red color */
            background-color: #1c1f26;
        }
    </style>
    <script>
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

        document.addEventListener('DOMContentLoaded', () => {
            const gamePieces = [
                'Game Piece 1',
                'Game Piece 2',
                'Game Piece 3',
                'Game Piece 4',
                'Game Piece 5',
                'Game Piece 6',
                'Game Piece 7',
                'Game Piece 8',
                'Game Piece 9',
                'Game Piece 10'
            ];
            const container = document.getElementById('game-pieces-container');
            gamePieces.forEach(piece => {
                const div = document.createElement('div');
                div.className = 'game-piece';
                div.onclick = toggleRemoved;
                div.textContent = piece;
                container.appendChild(div);
            });
            updateCounter();
        });
    </script>
</head>
<body>
    <h1>Game Pieces</h1>
    <div id="counter">Remaining units: 100%</div>
    <div id="game-pieces-container"></div>
</body>
</html>

