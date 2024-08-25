document.addEventListener('DOMContentLoaded', () => {
    let randomNumber = Math.floor(Math.random() * 1000) + 1;
    let guessCount = 0;

    const guessInput = document.getElementById('guessInput');
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('feedback');
    const guessCountDisplay = document.getElementById('guessCount');
    const restartBtn = document.getElementById('restartBtn');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const rangeDisplay = document.getElementById('rangeDisplay');
    const shareScoreBtn = document.getElementById('shareScoreBtn');

    // Sound effects
    const correctSound = new Audio('correct.mp3');
    const incorrectSound = new Audio('incorrect.mp3');

    // Initial range display
    rangeDisplay.textContent = `Guess a number between 1 and 1000`;

    submitBtn.addEventListener('click', () => {
        let userGuess = parseInt(guessInput.value);
        guessCount++;

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 1000) {
            feedback.textContent = 'Please enter a valid number between 1 and 1000.';
            guessInput.classList.add('shake');
            return;
        }

        guessInput.classList.remove('shake');

        if (userGuess === randomNumber) {
            feedback.textContent = `Congratulations! You guessed the number ${randomNumber} in ${guessCount} guesses!`;
            feedback.style.color = 'green';
            correctSound.play();
            endGame();
        } else {
            incorrectSound.play();
            if (userGuess > randomNumber) {
                feedback.textContent = 'Too high! Try again.';
            } else {
                feedback.textContent = 'Too low! Try again.';
            }
            feedback.style.color = 'red';
            updateProgressBar(userGuess);
        }

        guessCountDisplay.textContent = `Guesses: ${guessCount}`;
        guessInput.value = '';
    });

    restartBtn.addEventListener('click', () => {
        guessCount = 0;
        randomNumber = Math.floor(Math.random() * 1000) + 1;
        feedback.textContent = '';
        guessCountDisplay.textContent = 'Guesses: 0';
        restartBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        guessInput.disabled = false;
        progressBarFill.style.width = '0';

        // Reset range display
        rangeDisplay.textContent = `Guess a number between 1 and 1000`;
    });

    function endGame() {
        guessInput.disabled = true;
        submitBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';
    }

    function updateProgressBar(guess) {
        const progress = Math.abs(randomNumber - guess);
        progressBarFill.style.width = `${(1000 - progress) / 10}%`;
    }

    // Theme selection
    const themeButtons = document.querySelectorAll('.theme-button');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.documentElement.className = button.classList[1];
        });
    });

    // Share button functionality
    const shareFacebook = document.getElementById('shareFacebook');
    const shareWhatsApp = document.getElementById('shareWhatsApp');
    const shareInstagram = document.getElementById('shareInstagram');

    const pageUrl = window.location.href;

    // Update share button links
    function updateShareLinks() {
        const shareText = `I guessed the number ${randomNumber} in ${guessCount} tries! Think you can do better? Try it out here: ${pageUrl}`;

        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareText)}`;
        shareWhatsApp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        shareInstagram.href = `https://www.instagram.com/?url=${encodeURIComponent(pageUrl)}`;
    }

    shareScoreBtn.addEventListener('click', () => {
        if (guessCount === 0) {
            alert('Play the game to get a score to share!');
            return;
        }
        updateShareLinks();

        // Open share links in new tabs
        window.open(shareFacebook.href, '_blank');
        window.open(shareWhatsApp.href, '_blank');
        window.open(shareInstagram.href, '_blank');
    });
});
