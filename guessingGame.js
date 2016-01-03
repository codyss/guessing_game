/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.




function Game() {
    this.winningNumber = 0;
    this.playersGuess = 0;
    this.numberOfGuesses = 0;
    this.guesses = [];
}


// Generate the Winning Number
Game.prototype.winningNumberGenerator = function () {
    this.winningNumber = Math.floor(Math.random() * 100);
}

// Fetch the Players Guess
Game.prototype.playersGuessGenerator = function () {
        var obj = document.getElementById('num-input');
        this.playersGuess = parseInt(obj.value);
        obj.value = '';
}


/* **** Guessing Game Functions **** */


// Determine if the next guess should be a lower or higher number

Game.prototype.lowerOrHigher = function () {
    if(this.playersGuess > this.winningNumber) {
        return 'higher';
    } else {
        return 'lower';
    }
}


//Generate message to display to player

Game.prototype.guessMessage = function() {
    if (Math.abs(this.playersGuess - this.winningNumber) > 20) {
        return "Your guess is " + this.lowerOrHigher() + " and more than 20 digits from the winning number";
    } else if (Math.abs(this.playersGuess - this.winningNumber) > 10) {
        return "Your guess is " + this.lowerOrHigher() + " and within 20 digits of the winning number";
    } else if (Math.abs(this.playersGuess - this.winningNumber) > 5) {
        return "Your guess is " + this.lowerOrHigher() + " and within 10 digits of the winning number";
    } else {
        return "Your guess is " + this.lowerOrHigher() + " and within 5 digits of the winning number";
    }  
}


// Check if the Player's Guess is the winning number 
//var numberOfGuesses = 0;
//var guesses = [];


Game.prototype.checkGuess = function() { 
     if (this.numberOfGuesses >= 4 && this.playersGuess !== this.winningNumber) {
        this.numberOfGuesses++;
        $('#guessanswer').css('visibility','visible');
        $('#guessanswer').text("No Luck This Time. Play Again!");
    } else if(this.playersGuess === this.winningNumber) {
        $('#guessanswer').css('visibility','visible');
        $('#guessanswer').text("You Win!");
        $('#trophy').css('visibility','visible');
        $('#trophy').effect('bounce', {times:3},500); 
    } else if (this.guesses.indexOf(this.playersGuess)>=0){
        $('#guessanswer').css('visibility','visible');
        $('#guessanswer').text("You already guessed that number!");
    } else {
        this.numberOfGuesses++;
        this.guesses.push(this.playersGuess);
        $('#guessanswer').css('visibility','visible');
        $('#guessanswer').text(this.guessMessage());
    }
}


Game.prototype.guessesRemaining = function(){
    if (this.numberOfGuesses < 5) {
        return (5-this.numberOfGuesses) + " guesses remaining!";    
    } else {
        return "No Guesses Left";
    }

    
}

// Create a provide hint button that provides additional clues to the "Player"


Game.prototype.provideHint = function() {
    if (this.numberOfGuesses<3) {
        $('guessanswer').css('visibility','visible');
        $('#guessanswer').text("Guess some more before you get a hint");
    } else {
        var message = 'The correct number is one of the following: ' + Math.floor(Math.random() * 100) + ", " + this.winningNumber + ", " + Math.floor(Math.random() * 100);
        $('guessanswer').css('visibility','visible');
        $('#guessanswer').text(message);
    }
}

// Allow the "Player" to Play Again

Game.prototype.playAgain = function() {
    this.winningNumberGenerator();
    this.numberOfGuesses = 0;
    this.guesses = [];
    $('#guessanswer').css('visibility','hidden');
    $('#trophy').css('visibility','hidden');
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
    var newGame = new Game();
    newGame.winningNumberGenerator();
    $('#hintbutton').on('click', function () {
        newGame.provideHint();
    });

    $('#playagain').on('click', function () {
        newGame.playAgain();
        $('#guess-counter').html('<h3>'+newGame.guessesRemaining()+'</h3>');
    });

    $('#num-input').keypress(function(e) {
        if(e.which == 13) {
            newGame.playersGuessGenerator();
            newGame.checkGuess();
            $('#guess-counter').html('<h3>'+newGame.guessesRemaining()+'</h3>');
        }
    });

    $('.main-box').on('click', 'button', function () {
        newGame.playersGuessGenerator();
        newGame.checkGuess();
        $('#guess-counter').html('<h3>'+newGame.guessesRemaining()+'</h3>');
    });
});
