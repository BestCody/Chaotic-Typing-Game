document.addEventListener('DOMContentLoaded', function() {
    const Text1 = [
        "This is a really cool typing game!"
    ];
    const input = document.getElementById('animatedInput');
    const audio = new Audio('music.mp3');
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isTyping = false;
    let audioStarted = false;
    
    audio.loop = true;
    audio.volume = 0.6;

    function animatePlaceholder(placeholderTexts, speeds = {}) {
        const {
            typeSpeed = 100,
            deleteSpeed = 50, 
            pauseAfterComplete = 2000,
            pauseAfterDelete = 500,
            pauseWhenBusy = 500 
        } = speeds;
        
        if (input.value || document.activeElement === input || isTyping) {
            return setTimeout(() => animatePlaceholder(placeholderTexts, speeds), pauseWhenBusy);
        }

        const currentText = placeholderTexts[currentTextIndex];
        
        if (!isDeleting) {
            input.placeholder = currentText.substring(0, currentCharIndex++);
            if (currentCharIndex > currentText.length) {
                isDeleting = true;
                return setTimeout(() => animatePlaceholder(placeholderTexts, speeds), pauseAfterComplete);
            }
        } else {
            input.placeholder = currentText.substring(0, currentCharIndex--);
            if (currentCharIndex < 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % placeholderTexts.length;
                return setTimeout(() => animatePlaceholder(placeholderTexts, speeds), pauseAfterDelete);
            }
        }
        
        setTimeout(() => animatePlaceholder(placeholderTexts, speeds), isDeleting ? deleteSpeed : typeSpeed);
    }

    function startAudioAndGlow() {
        if (!audioStarted) {
            audio.play().then(() => audioStarted = true).catch(console.error);
        }

        Object.assign(input.style, {
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
            boxShadow: '0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 60px #00ff88'
        });
        
        setTimeout(() => Object.assign(input.style, { boxShadow: '', transform: 'scale(1)' }), 1000);
    }

    animatePlaceholder(Text1);
    input.addEventListener('click', startAudioAndGlow);
    input.addEventListener('focus', () => {
        input.placeholder = 'Type here...';
        isTyping = true;
        startAudioAndGlow();
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            isTyping = false;
            currentCharIndex = 0;
            isDeleting = false;
            setTimeout(() => animatePlaceholder(Text1), 100);
        }
    });

    input.addEventListener('input', () => isTyping = !!input.value);
    
    input.addEventListener('mouseenter', () => {
        if (!input.matches(':focus')) {
            Object.assign(input.style, {
                transition: 'box-shadow 0.2s ease',
                boxShadow: '0 0 10px rgba(0, 255, 136, 0.3)'
            });
        }
    });

    input.addEventListener('mouseleave', () => {
        if (!input.matches(':focus')) input.style.boxShadow = '';
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && audioStarted) {
            audio.pause();
        } else if (!document.hidden && audioStarted) {
            audio.play();
        }
    });
});
