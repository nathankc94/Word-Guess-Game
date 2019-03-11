// word lists
var wordLists  = [
    "sanchez",
    "gutierrez", 
    "besler", 
    "nemeth",  
    "melia", 
    "espinoza", 
    "russell", 
    "zusi", 
    "sinovic", 
    "fernandes",
    "fontas"
];
//  data
var remainingGuesses = 0;       
var guessingWord = [];          
var guessedLetters = [];        
var gameStarted = false;        
var hasFinished = false;        
var wins = 0;                   
var generateWords;          
const maxTries = 5;            


// 1. Reset game
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    //1.1 generate random words
    generateWords = Math.floor(Math.random() * (wordLists.length));

    // 1.2 Clear out arrays
    guessingWord = [];
    guessedLetters = [];

    

    // 1.3 Build the guessing word and clear it out
    for (var i = 0; i < wordLists[generateWords].length; i++) {
        guessingWord.push("_");
    }
   
};



//  2. Display content
function updateDisplay() {

    // 2.2 display total wins/ current words/ remaing guesses/ guess letters
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;

    // 2.3 disply underscores on current word
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
   
    // 2.3 restart game when out if guesses tries
    if(remainingGuesses <= 0) {
        hasFinished = true;
    }
};


//  3. User input
document.onkeydown = function(event) {
// 3.2 reset game when finised
    if(hasFinished) {
        resetGame();
        hasFinished = false;
                                        // 3.3 https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) { 
            makeGuess(event.key.toLowerCase());
        }
    }
};

//  4. Keep track of remaing guesses
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            mainFunction(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

// 5. capture right guesses/ replace place holder with right letters
function mainFunction(letter) {
    
    var positions = [];

    for (var i = 0; i < wordLists[generateWords].length; i++) {
        if(wordLists[generateWords][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

// 6. check win
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
    }
};


