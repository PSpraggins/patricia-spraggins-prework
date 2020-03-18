// global variables
const winsTotal = document.querySelector('#wins-total');
const wordSpaces = document.querySelector('#word-spaces');
const guessesRemainingId = document.querySelector('#guesses-remaining');
const lettersGuessed = document.querySelector('#letters-guessed');
const songTitle = document.querySelector('#song-title');
const imgDiv = document.querySelector('#left-col');
const audio = document.getElementById('audio');
const once = {
    once: true
};
let num = 0;
let word = '';
let displayFirst = [],
    displayLast = [];
let firstName,
    lastName;

// game object
const hangman = {
    // artist names to be guessed
    words: [
        "BLAKE SHELTON",
        "JASON ALDEAN",
        "TIM MCGRAW",
        "MIRANDA LAMBERT",
        "CARRIE UNDERWOOD",
        "KEITH URBAN",
        "GARTH BROOKS",
        "DOLLY PARTON",
        "WILLIE NELSON",
        "GEORGE STRAIT"
    ],
    // songs to play after winning guess
    songs: [
        "GOD GAVE ME YOU BY BLAKE SHELTON",
        "DIRT ROAD ANTHEM BY JASON ALDEAN",
        "HUMBLE AND KIND BY TIM MCGRAW",
        "THE HOUSE THAT BUILT ME BY MIRANDA LAMBERT",
        "SOMETHING IN THE WATER BY CARRIE UNDERWOOD",
        "COP CAR BY KEITH URBAN",
        "FRIENDS IN LOW PLACES BY GARTH BROOKS",
        "JOLENE BY DOLLY PARTON",
        "ALWAYS ON MY MIND BY WILLIE NELSON",
        "LOVE WITHOUT END, AMEN BY GEORGE STRAIT"
    ],
    wins: 0,
    guessesRemaining: 12,
    // method to return the current word
    // checks to see if it is the last word to display it
    currentWord: function () {
        if (num > this.words.length - 1) {
            imgDiv.innerHTML = `<img class= "img-fluid" src= "assets/images/${
                this.words[this.words.length - 1]
            }.jpg" alt= "image of ${
                this.words[this.words.length - 1]
            }">`;
            songTitle.innerText = this.songs[this.words.length - 1];
            audio.src = `assets/songs/${
                songTitle.innerText
            }.mp3`;
            num = 0;
            this.guessesRemaining = 12;
            displayFirst = [];
            displayLast = [];
        }
        return this.words[num];
    },
    // start method to set up first word with hangman image
    start: function () {
        imgDiv.innerHTML = `<img class= "img-fluid" src= "assets/images/HANGMAN.jpg" alt= "image of hangman game">`;
        guessesRemainingId.innerText = this.guessesRemaining;
        this.wordDisplay(this.currentWord());

    },
    // wordDisplay method displays the spaces for each word
    wordDisplay: function (currentWord) {
        displaySpaces = ' ';
        wordSpaces.innerText = '';
        word = currentWord.split(" ");
        firstName = word[0];
        lastName = word[1];
        for (let i = 0; i < firstName.length; i++) {
            displayFirst.push(' _ ');
        }
        for (let i = 0; i < lastName.length; i++) {
            displayLast.push(' _ ');
        }
        displaySpaces = displayFirst.join("") + '\n' + displayLast.join("");
        wordSpaces.innerText = displaySpaces;
    },
    // updateWordDisplay method puts letters where they belong after each letter guess
    updateWordDisplay: function (letter) {
        for (let i = 0; i < firstName.length; i++) {
            if (firstName[i] === letter) {
                displayFirst[i] = letter;
            }
        }
        for (let i = 0; i < lastName.length; i++) {
            if (lastName[i] === letter) {
                displayLast[i] = letter;
            }
        }
        displaySpaces = displayFirst.join("") + '\n' + displayLast.join("");
        wordSpaces.innerText = displaySpaces;
        this.winnerOrLoser();
    },
    // guess method makes the letter pressed uppercase, a letter, if it is in the
    // word and then determines if you have completed the word and won
    guess: function (event) {
        let letter = event.key.toUpperCase();
        if(event.keyCode > 64 && event.keyCode < 91){
            this.lettersArr(letter);
        } else{
            console.log("not a-z");
        }
        

    },
    // checks to see if there is a win or loss
    winnerOrLoser: function () {
        if (!displaySpaces.includes('_')) {
            this.win();
        } else if (this.guessesRemaining < 1) {
            this.lose();
        }
    },
    // lettersArr method updates the letters guessed area on the screen to show
    // player which letters they have guessed
    // also prevents guessing a letter more than once
    lettersArr: function (letter) {
        if (! lettersGuessed.innerText.includes(letter)) {
            lettersGuessed.innerText += letter;
            this.guessesRemaining = this.guessesRemaining - 1;
            guessesRemainingId.innerText = this.guessesRemaining;
            this.updateWordDisplay(letter);
        }

    },
    //resets the board for a new word
    resetBoard: function(){
        num++;
        displayFirst = [];
        displayLast = [];
        this.currentWord();
        this.guessesRemaining = 12;
        guessesRemainingId.innerText = this.guessesRemaining;
        this.lettersGuessed = [];
        lettersGuessed.innerText = '';
        this.wordDisplay(this.currentWord());
        if (num === 0) {
            imgDiv.innerHTML = `<img class= "img-fluid" src= "assets/images/${
                this.words[this.words.length - 1]
            }.jpg" alt= "image of ${
                this.words[this.words.length - 1]
            }">`;
        } else {
            imgDiv.innerHTML = `<img class= "img-fluid" src= "assets/images/${
                this.words[num - 1]
            }.jpg" alt= "image of ${
                this.words[num - 1]
            }">`;
        }
    },
    // win method alerts player they won and resets the board with the next word
    win: function () {
        alert(`Winner! ${firstName} ${lastName} was correct!`);
        this.wins += 1;
        winsTotal.innerText = this.wins;
        this.resetBoard();
        if (num === 0) {
            songTitle.innerText = this.songs[this.words.length - 1];
        } else {
            songTitle.innerText = this.songs[num - 1];
        } 
        audio.src = `assets/songs/${songTitle.innerText}.mp3`;

    },
    // lose method alerts player if they lose and resets the board for the current word
    lose: function () {
        alert(`Sorry, You lost that one. ${firstName} ${lastName} was the correct answer.`);
        this.resetBoard();
    }


}

// listening for key down presses and going into the start method
document.addEventListener("keydown", hangman.start(), once);
