/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
    return Math.floor(Math.random() * 100);
}

winningNumber = generateWinningNumber();

// Fetch the Players Guess

function playersGuessSubmission(){
    var obj = document.getElementById('num-input');
    playersGuess = parseInt(obj.value);
    obj.value = '';
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
    if (playersGuess > winningNumber) {
        return "higher";
    } else {
        return "lower";
    }
}

function guessMessage(){
    if (Math.abs(playersGuess - winningNumber) > 20) {
        return "Your guess is " + lowerOrHigher() + " and more than 20 digits from the winning number";
    } else if (Math.abs(playersGuess - winningNumber) > 10) {
        return "Your guess is " + lowerOrHigher() + " and within 20 digits of the winning number";
    } else if (Math.abs(playersGuess - winningNumber) > 5) {
        return "Your guess is " + lowerOrHigher() + " and within 10 digits of the winning number";
    } else {
        return "Your guess is " + lowerOrHigher() + " and within 5 digits of the winning number";
    }
}


// Check if the Player's Guess is the winning number 
var numberOfGuesses = 0;
var guesses = [];

function checkGuess(){ 
    if(playersGuess === winningNumber) {
        $('#guessanswer').css('visibility','visible');
        $('#guessanswer').text("You Win!");
        $('#trophy').css('visibility','visible');
        $('trophy').effect('bounce', {times:3},500); 
    } else if (guesses.indexOf(playersGuess)>=0){
        $('#guessanswer').css('visibility','visible');
        $('#guessanswer').text("You already guessed that number!");
    } else {
        numberOfGuesses++;
        guesses.push(playersGuess);
        $('#guessanswer').css('visibility','visible');
        $('#guessanswer').text(guessMessage());
    }
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
    if (numberOfGuesses<4) {
        $('guessanswer').css('visibility','visible');
        $('#guessanswer').text("Guess some more before you get a hint");
    } else {
        var message = 'The correct number is one of the following: ' + Math.floor(Math.random() * 100) + ", " + winningNumber + ", " + Math.floor(Math.random() * 100);
        $('guessanswer').css('visibility','visible');
        $('#guessanswer').text(message);
    }
}

// Allow the "Player" to Play Again

function playAgain(){
    winningNumber = generateWinningNumber();
    numberOfGuesses = 0;
    guesses = [];
    $('#guessanswer').css('visibility','hidden');
    $('#trophy').css('visibility','hidden');
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
    $('#hintbutton').on('click', function () {
        provideHint();
    });

    $('#playagain').on('click', function () {
        playAgain();
    });

    $('#num-input').keypress(function(e) {
        if(e.which == 13) {
            checkGuess();
        }
    });

    $('.main-box').on('click', 'button', function () {
        checkGuess();
    });    
});
