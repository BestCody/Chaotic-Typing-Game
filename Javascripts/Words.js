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
    const wordTracker = document.getElementById('wordTracker'); // Grab the new UI element
    const bodyElement = document.body;
    
    let currentWord = '';
    let wordsCompleted = 0;
    let gameStarted = false;
    let isBackwards = false;

    const effects = [
        'effect-flicker',
        'effect-mirror',
        'effect-spin',
        'effect-blind',
        'effect-earthquake',
        'effect-shrink',
        'effect-rainbow',
        'effect-drift',
        'effect-backwards'
    ];

    function updateWord(){
        // Remove previous effect
        effects.forEach(effect => bodyElement.classList.remove(effect));
        
        // Pick a random effect, making sure it isn't mirror on the very first word
        let randomEffect;
        if (wordsCompleted === 0) {
            const safeEffects = effects.filter(e => e !== 'effect-mirror');
            randomEffect = safeEffects[Math.floor(Math.random() * safeEffects.length)];
        } else {
            randomEffect = effects[Math.floor(Math.random() * effects.length)];
        }

        bodyElement.classList.add(randomEffect);

        // Check if the current effect is the backwards typing one
        isBackwards = (randomEffect === 'effect-backwards');

        currentWord = words[Math.floor(Math.random() * words.length)];
        
        // Update the display to warn them if they need to type backwards
        if (isBackwards) {
            wordsBox.innerHTML = `<strong>${currentWord}</strong> <br><span style="color:red;">(TYPE IT BACKWARDS!)</span>`;
        } else {
            wordsBox.textContent = currentWord;
        }
        
        wordsBox.className = 'description-centered';
        inputElement.value = '';
        
        // Update the word tracker text on screen
        wordTracker.textContent = `Words: ${wordsCompleted}`;
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
        
        // If the backwards effect is active, check against the reversed word
        let targetWord = isBackwards ? currentWord.split('').reverse().join('') : currentWord;
        
        if (inputElement.value === targetWord) {
            wordsCompleted++;
            updateWord();
        }
    });
});
