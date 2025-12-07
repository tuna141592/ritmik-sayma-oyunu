# Ritmik Sayma Oyunu

This document outlines the steps taken to create the Ritmik Sayma Oyunu (Rhythmic Counting Game).

## Project Setup

1.  **Created the project structure:**
    *   `mkdir -p js css audio`
    *   `touch index.html css/style.css js/app.js`

2.  **Created the basic HTML structure:**
    *   Added the main container, game info section, game area, and start button.
    *   Linked the CSS and JavaScript files.

3.  **Added basic CSS styling:**
    *   Styled the container, game info, game area, number boxes, and start button.

4.  **Implemented the core game logic in JavaScript:**
    *   Defined game variables (level, score, timer, etc.).
    *   Created a `levels` array with different sequences and durations.
    *   Implemented the `startGame`, `startLevel`, `generateNumbers`, `checkAnswer`, `updateTimer`, and `endGame` functions.

## Visual Improvements

1.  **Increased difficulty:**
    *   Added more levels to the `levels` array with longer sequences and shorter durations.

2.  **Added visual feedback:**
    *   Added `correct` and `incorrect` classes to the number boxes when clicked.
    *   Styled the `correct` and `incorrect` classes in CSS with different colors and animations.

3.  **Added a progress bar:**
    *   Added a progress bar element to the `index.html` file.
    *   Styled the progress bar in CSS.
    *   Updated the `updateTimer` function to change the width of the progress bar.

4.  **Improved the overall design:**
    *   Used a more playful font.
    *   Updated the color scheme.
    *   Added hover effects and box shadows to the number boxes and buttons.

## Feature Additions

1.  **Added a hint button:**
    *   Added a hint button to the `index.html` file.
    *   Styled the hint button in CSS.
    *   Implemented the `showHint` function in JavaScript to highlight the next correct number.
    *   Deducted points when the hint button is used.

2.  **Added sound effects and background music:**
    *   Created an `audio` directory.
    *   Added `<audio>` elements for correct/incorrect sounds and background music to `index.html`.
    *   Added JavaScript logic to play the sounds at the appropriate times.
    *   **Note:** The sound files (`correct.wav`, `incorrect.wav`, `background.wav`) were not generated and need to be provided by the user.

3.  **Added a mute button:**
    *   Added a mute button to the `index.html` file.
    *   Styled the mute button in CSS.
    *   Implemented the `toggleMute` function in JavaScript to mute/unmute all sounds.

## Gamification

1.  **Added a character selection screen:**
    *   Created a `character.html` file for players to choose a character (robot, cat, or alien).
    *   The selected character is stored in `localStorage` and displayed on the game screen.
    *   Created placeholder images for the characters.

2.  **Added a map for progression:**
    *   Added a map to the `index.html` file.
    *   The character moves along the map as the player's score increases.
    *   Created a placeholder image for the map.

3.  **Added new question types:**
    *   **Fill-in-the-blank:** Some levels now present a sequence with a missing number that the player needs to identify.
    *   **Reverse Rhythmic Counting:** Added levels that require players to count backwards.
    *   Updated the `levels` array and game logic to support these new question types.
