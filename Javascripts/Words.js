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
    const wordTracker = document.getElementById('wordTracker'); 
    
    // CHANGE: Target the container instead of the body
    const effectTarget = document.querySelector('.container'); 
    
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
        // Remove previous effect from the container
        effects.forEach(effect => effectTarget.classList.remove(effect));
        
        // Pick a random effect, making sure it isn't mirror on the very first word
        let randomEffect;
        if (wordsCompleted === 0) {
            const safeEffects = effects.filter(e => e !== 'effect-mirror');
            randomEffect = safeEffects[Math.floor(Math.random() * safeEffects.length)];
        } else {
            randomEffect = effects[Math.floor(Math.random() * effects.length)];
        }

        // Apply effect to the container only
        effectTarget.classList.add(randomEffect);

        isBackwards = (randomEffect === 'effect-backwards');

        currentWord = words[Math.floor(Math.random() * words.length)];
        
        if (isBackwards) {
            wordsBox.innerHTML = `<strong>${currentWord}</strong> <br><span style="color:red;">(TYPE IT BACKWARDS!)</span>`;
        } else {
            wordsBox.textContent = currentWord;
        }
        
        wordsBox.className = 'description-centered';
        inputElement.value = '';
        
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
        
        let targetWord = isBackwards ? currentWord.split('').reverse().join('') : currentWord;
        
        if (inputElement.value === targetWord) {
            wordsCompleted++;
            updateWord();
        }
    });
});
