document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const gameArea = document.getElementById('game-area');
    const levelDisplay = document.getElementById('level');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const hintButton = document.getElementById('hint-button');
    const muteButton = document.getElementById('mute-button');
    const progressBar = document.getElementById('progress-bar');
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');
    const backgroundMusic = document.getElementById('background-music');

    let currentLevel = 1;
    let score = 0;
    let timer = 60;
    let timerInterval;
    let correctSequence;
    let isMuted = false;
    let blankAnswer = null;
    let sequenceIndex = 0;

    const levels = [
        { sequence: [2, 4, 6, 8, 10], duration: 60, type: 'rhythmic' },
        { sequence: [3, 6, 9, 12, 15], duration: 50, type: 'rhythmic' },
        { sequence: [20, 18, 16, 14, 12], duration: 50, type: 'reverse' },
        { sequence: [4, 8, 12, 16, 20], duration: 40, type: 'rhythmic' },
        { sequence: [5, 10, 15, 20, 25], duration: 30, type: 'fillInTheBlank' },
        { sequence: [30, 25, 20, 15, 10], duration: 40, type: 'reverse' },
        { sequence: [6, 12, 18, 24, 30, 36], duration: 45, type: 'rhythmic' },
        { sequence: [7, 14, 21, 28, 35, 42], duration: 40, type: 'fillInTheBlank' },
        { sequence: [40, 32, 24, 16, 8], duration: 35, type: 'reverse' },
        { sequence: [8, 16, 24, 32, 40, 48], duration: 35, type: 'rhythmic' },
        { sequence: [9, 18, 27, 36, 45, 54], duration: 30, type: 'fillInTheBlank' },
        { sequence: [55, 44, 33, 22, 11], duration: 30, type: 'reverse' },
        { sequence: [10, 20, 30, 40, 50, 60], duration: 25, type: 'rhythmic' },
        { sequence: [11, 22, 33, 44, 55, 66], duration: 20, type: 'fillInTheBlank' },
        { sequence: [100, 90, 80, 70, 60], duration: 25, type: 'reverse' }
    ];

    function initializeGame() {
        const selectedCharacter = localStorage.getItem('selectedCharacter');
        if (!selectedCharacter) {
            //window.location.href = 'character.html';
        }
    }

    function updateCharacterPosition() {
        const mapWidth = document.getElementById('map').offsetWidth;
        const maxScore = levels.reduce((acc, level) => acc + level.sequence.length * 10, 0);
        const progress = Math.min(score / maxScore, 1);
        const characterPosition = progress * (mapWidth - character.width);
        character.style.left = `${characterPosition}px`;
    }

    function toggleMute() {
        isMuted = !isMuted;
        correctSound.muted = isMuted;
        incorrectSound.muted = isMuted;
        backgroundMusic.muted = isMuted;
        muteButton.textContent = isMuted ? 'Sesi Aç' : 'Sessize Al';
    }

    muteButton.addEventListener('click', toggleMute);

    function startGame() {
        const selectedCharacter = localStorage.getItem('selectedCharacter');
        if (selectedCharacter) {
            character.src = `audio/${selectedCharacter}.png`;
        }
        startButton.style.display = 'none';
        hintButton.style.display = 'inline-block';
        if (!isMuted) {
            backgroundMusic.play();
        }
        startLevel();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function showHint() {
        const nextNumber = correctSequence[sequenceIndex];
        const numberBoxes = document.querySelectorAll('.number-box');
        numberBoxes.forEach(box => {
            if (parseInt(box.textContent) === nextNumber) {
                box.classList.add('hint');
                setTimeout(() => {
                    box.classList.remove('hint');
                }, 500);
            }
        });
        score -= 2;
        scoreDisplay.textContent = score;
    }

    hintButton.addEventListener('click', showHint);

    function startLevel() {
        const levelData = levels[currentLevel - 1];
        correctSequence = levelData.sequence;
        timer = levelData.duration;

        levelDisplay.textContent = currentLevel;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timer;
        progressBar.style.width = '100%';

        gameArea.innerHTML = '';
        let numbers;
        if (levelData.type === 'fillInTheBlank') {
            numbers = generateFillInTheBlankQuestion(correctSequence);
        } else if (levelData.type === 'reverse') {
            numbers = generateReverseCountingQuestion(correctSequence);
        } else {
            numbers = generateNumbers(correctSequence);
        }

        if (levelData.type === 'fillInTheBlank') {
            const sequenceContainer = document.createElement('div');
            sequenceContainer.classList.add('sequence-container');
            const sequenceToDisplay = [...correctSequence];
            const blankIndex = sequenceToDisplay.indexOf(blankAnswer);
            sequenceToDisplay[blankIndex] = '?';
            sequenceToDisplay.forEach(num => {
                const numBox = document.createElement('div');
                numBox.classList.add('number-box', 'sequence-box');
                numBox.textContent = num;
                sequenceContainer.appendChild(numBox);
            });
            gameArea.appendChild(sequenceContainer);
        }


        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        numbers.forEach(number => {
            const numberBox = document.createElement('div');
            numberBox.classList.add('number-box');
            numberBox.textContent = number;
            numberBox.addEventListener('click', (e) => checkAnswer(number, e.target));
            optionsContainer.appendChild(numberBox);
        });
        gameArea.appendChild(optionsContainer);
    }

    function generateNumbers(sequence) {
        const numbers = [...sequence];
        const maxNumber = Math.max(...sequence) + 10;
        while (numbers.length < 10) {
            const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        return numbers.sort(() => Math.random() - 0.5);
    }

    function generateFillInTheBlankQuestion(sequence) {
        const blankIndex = Math.floor(Math.random() * sequence.length);
        blankAnswer = sequence[blankIndex];
        const numbers = generateNumbers(sequence);
        if (!numbers.includes(blankAnswer)) {
            numbers[Math.floor(Math.random() * numbers.length)] = blankAnswer;
        }
        return numbers;
    }

    function generateReverseCountingQuestion(sequence) {
        correctSequence = sequence;
        const numbers = generateNumbers(sequence);
        return numbers;
    }

    function checkAnswer(number, element) {
        const levelData = levels[currentLevel - 1];
        let isCorrect = false;
        if (levelData.type === 'fillInTheBlank') {
            if (number === blankAnswer) {
                isCorrect = true;
                correctSequence = [blankAnswer];
            }
        } else {
            if (number === correctSequence[sequenceIndex]) {
                isCorrect = true;
            }
        }


        if (isCorrect) {
            score += 10;
            scoreDisplay.textContent = score;
            updateCharacterPosition();
            element.classList.add('correct');
            if (!isMuted) {
                correctSound.play();
            }
            sequenceIndex++;
            if (sequenceIndex === correctSequence.length) {
                currentLevel++;
                if (currentLevel > levels.length) {
                    endGame(true);
                } else {
                    setTimeout(() => {
                        sequenceIndex = 0;
                        blankAnswer = null;
                        startLevel();
                    }, 500);
                }
            }
        } else {
            score -= 5;
            scoreDisplay.textContent = score;
            element.classList.add('incorrect');
            if (!isMuted) {
                incorrectSound.play();
            }
            setTimeout(() => {
                element.classList.remove('incorrect');
            }, 500);
        }
    }

    function updateTimer() {
        timer--;
        timerDisplay.textContent = timer;
        const progress = (timer / levels[currentLevel - 1].duration) * 100;
        progressBar.style.width = `${progress}%`;
        if (timer <= 0) {
            endGame(false);
        }
    }

    function endGame(isWinner) {
        clearInterval(timerInterval);
        backgroundMusic.pause();
        gameArea.innerHTML = '';
        if (isWinner) {
            gameArea.innerHTML = '<h2>Tebrikler, kazandınız!</h2>';
        } else {
            gameArea.innerHTML = `<h2>Süre doldu, kaybettiniz!</h2><p>Doğru sıralama: ${correctSequence.join(', ')}</p>`;
        }
        startButton.style.display = 'block';
        hintButton.style.display = 'none';
        startButton.textContent = 'Yeniden Oyna';
        currentLevel = 1;
        score = 0;
        sequenceIndex = 0;
        startButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    startButton.addEventListener('click', startGame);

    initializeGame();
});