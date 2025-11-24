document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('game-area');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const messageDisplay = document.getElementById('message');

    // --- Game Variables ---
    let score = 0;
    let timeLeft = 10;
    let gameInterval;
    let timerInterval;
    let gameActive = false;
    const GAME_DURATION = 10; // 10 seconds

    // --- Functions ---

    // 1. Creates and adds the clickable button to the game area
    function createButton() {
        const button = document.createElement('button');
        button.id = 'thanksgiving-button';
        button.className = 'clickable-button';
        button.textContent = 'Happy Thanksgiving!';
        button.addEventListener('click', handleButtonClick);
        gameArea.appendChild(button);
        moveButton(button);
    }

    // 2. Moves the button to a new random location within the game area
    function moveButton(button) {
        const areaWidth = gameArea.clientWidth - button.offsetWidth;
        const areaHeight = gameArea.clientHeight - button.offsetHeight;

        // Calculate random position
        const randomX = Math.floor(Math.random() * areaWidth);
        const randomY = Math.floor(Math.random() * areaHeight);

        // Apply position
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
    }

    // 3. Handles a button click
    function handleButtonClick(event) {
        if (!gameActive) return; // Ignore clicks if game isn't running

        score++;
        scoreDisplay.textContent = score;

        // Move the button after a successful click
        moveButton(event.target);
    }

    // 4. Starts the timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000); // Update every second
    }

    // 5. Initiates the game
    function startGame() {
        if (gameActive) return;

        // Reset state
        score = 0;
        timeLeft = GAME_DURATION;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        messageDisplay.textContent = '';
        gameActive = true;
        startButton.disabled = true;

        // Clear previous button and create a new one
        gameArea.innerHTML = '';
        createButton();

        // Start the timer
        startTimer();
    }

    // 6. Ends the game
    function endGame() {
        gameActive = false;
        clearInterval(timerInterval);
        startButton.disabled = false;
        
        // Remove the button
        gameArea.innerHTML = ''; 

        // Display final message
        messageDisplay.textContent = `Time's up! Your final score is ${score} clicks!`;
    }

    // --- Event Listeners ---
    startButton.addEventListener('click', startGame);

    // Initial setup: create the button so it can be used immediately after starting
    createButton();
});
