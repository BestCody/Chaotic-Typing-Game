document.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 180;
    let timerInterval = null;
    let gameStarted = false;
    let timerPaused = false;

    const timerElement = document.getElementById('timer');
    const inputElement = document.getElementById('animatedInput');
    const bodyElement = document.body;

    const effects = ['effect-shake', 'effect-flicker', 'effect-invert', 'effect-blur'];

    function triggerChaoticEffect() {
        effects.forEach(effect => bodyElement.classList.remove(effect));
        
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        bodyElement.classList.add(randomEffect);

        setTimeout(() => {
            bodyElement.classList.remove(randomEffect);
        }, 2000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateTimer() {
        timerElement.textContent = formatTime(timeLeft);
        
        if (timeLeft <= 10) {
            timerElement.classList.add('warning');
        }

        if (timeLeft % 10 === 0 && timeLeft !== 180 && timeLeft > 0) {
            triggerChaoticEffect();
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00";
            inputElement.disabled = true;
            effects.forEach(effect => bodyElement.classList.remove(effect));
        }
        
        timeLeft--;
    }

    function startTimer() {
        if (!gameStarted) {
            gameStarted = true;
            timerInterval = setInterval(updateTimer, 1000);
        }
    }

    function pauseTimer() {
        if (timerInterval && !timerPaused) {
            clearInterval(timerInterval);
            timerPaused = true;
        }
    }

    function resumeTimer() {
        if (gameStarted && timerPaused && timeLeft > 0) {
            timerInterval = setInterval(updateTimer, 1000);
            timerPaused = false;
        }
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseTimer();
        } else {
            resumeTimer();
        }
    });

    inputElement.addEventListener('focus', startTimer);
    inputElement.addEventListener('click', startTimer);
});
