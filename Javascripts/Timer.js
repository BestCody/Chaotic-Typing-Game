document.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 90; 
    let timerInterval = null;
    let gameStarted = false;
    let timerPaused = false;

    const timerElement = document.getElementById('timer');
    const inputElement = document.getElementById('animatedInput');
    
    // CHANGE: Target the container to clean up effects when time ends
    const effectTarget = document.querySelector('.container');

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
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00";
            inputElement.disabled = true;
            
            // Clean up all effects on the container when the game ends
            effectTarget.className = 'container'; 
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
