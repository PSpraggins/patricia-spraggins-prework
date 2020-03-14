const winsTotal = document.querySelector('#wins-total');
const wordSpaces = document.querySelector('#word-spaces');
const guessesRemainingId = document.querySelector('#guesses-remaining');
const lettersGuessed = document.querySelector('#letters-guessed')
const imgDiv = document.querySelector('#left-col');
const once = {
    once: true
};
let num = 0;

const hangman = {
    words: ["BLAKE SHELTON", "JASON ALDEAN", "TIM MCGRAW", "MIRANDA LAMBERT", "CARRIE UNDERWOOD", "KEITH URBAN", "GARTH BROOKS", "DOLLY PARTON", "WILLIE NELSON", "GEORGE STRAIT"],
    wins: 0,
    guessesRemaining: 12,
    lettersArr: [],
    currentWord: function(){
        console.log("currentWord: " + this.words[num]);
        // let num = 0;
        imgDiv.innerHTML = `<img class= "img-fluid" src= "assets/images/${this.words[num]}.jpg" alt= "image of ${this.words[num]}">`;
        return this.words[num];
    },
    start: function(){
        console.log("start");
        guessesRemainingId.innerText = this.guessesRemaining;
        this.wordDisplay(this.currentWord());
        
    },
    wordDisplay: function(currentWord){
        wordSpaces.innerText = '';
        console.log("wordDisplay");
        let word = currentWord.split(" ");
        for(let i = 0; i < word[0].length; i++){
            wordSpaces.innerText += ' _ ';
        }
        wordSpaces.innerText += '\n';
        for(let i = 0; i < word[1].length; i++){
            wordSpaces.innerText += ' _ ';
        }
    },
    guess: function(event){
        console.log("guess");
        this.guessesRemaining = this.guessesRemaining - 1;
        console.log("keyboard event: " + event.key);
        let letter = event.key;
        this.lettersArr.push(letter);
        console.log(this.lettersArr);
        lettersGuessed.innerText += letter;
        console.log("guesses remaining: " + this.guessesRemaining);
        guessesRemainingId.innerText = this.guessesRemaining;
        if(this.guessesRemaining < 1){
            lettersGuessed.innerText = '';
            console.log("Sorry, you lost!");
            this.guessesRemaining = 12;
            num++;
            console.log(num);
            this.currentWord();
            this.wordDisplay(this.currentWord());
            this.lettersArr = [];
        
        }
        console.log(this.lettersArr);
    },
    win: function(){
        console.log("win");
        this.wins += 1;
        this.guessesRemaining = 12;
        this.lettersGuessed = [];
    }
  
}

document.addEventListener("keydown", hangman.start(), once);


