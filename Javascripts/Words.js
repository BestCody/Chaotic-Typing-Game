document.addEventListener('DOMContentLoaded', function() {
    const words = [
        'javascript', 'computer', 'keyboard', 'monitor', 'internet', 'website', 'coding', 'program',
        'function', 'variable', 'array', 'object', 'string', 'number', 'boolean', 'loop',
        'condition', 'event', 'click', 'hover', 'animation', 'style', 'color', 'background',
        'border', 'margin', 'padding', 'font', 'text', 'image', 'video', 'audio',
        'crazy', 'typing', 'game', 'fast', 'quick', 'speed', 'challenge', 'winner',
        'amazing', 'awesome', 'fantastic', 'incredible', 'wonderful', 'excellent', 'perfect', 'great'
    ];

    const inputElement = document.getElementById('animatedInput');
    const wordsBox = document.getElementById('description');
    let currentWord = '';
    let wordsCompleted = 0;
    let gameStarted = false;

    function updateWord(){
        currentWord = words[Math.floor(Math.random() * words.length)];
        wordsBox.textContent = currentWord;
        wordsBox.className = 'description-centered';
        inputElement.value = '';
    }

    inputElement.addEventListener('focus', () => {
        if (!gameStarted) {
            gameStarted = true;
            updateWord();
        }
    });

    inputElement.addEventListener('input', () => {
        if (!gameStarted) {
            gameStarted = true;
            updateWord();
        }
        if (inputElement.value === currentWord) {
            wordsCompleted++;
            updateWord();
        }
    });
});