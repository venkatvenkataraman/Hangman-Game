var guessesRemaining=5;
document.getElementById("resultsGuessesRemaining").innerHTML = "Guesses Remaining: " + guessesRemaining;

var lettersAlreadyGuessed=[];
document.getElementById("resultsLettersGuessed").innerHTML = "Wrong Letters Guessed: " + lettersAlreadyGuessed;

var correctLettersToDisplay=[];

var computerChoices=["MICHAEL_JACKSON","PHIL_COLLINS",
"PRINCE","MADONNA","BRUCE_SPRINGSTEEN","LIONEL_RICHIE"];

// "BILLY_OCEAN","CYNDI_LAUPER",
// "BON_JOVI","BOY_GEORGE","PAULA_ABDUL"

function emptyLettersInFeedbackScreen(computerRandomPick){
  var letter=" _ ";
  document.getElementById("feedbackBanner").innerHTML="GUESS LETTERS IN THE SINGER'S FIRST NAME_LAST NAME";
  document.getElementById("feedbackName").innerHTML=letter.repeat(computerRandomPick.length);
  for (var i = 0; i < computerRandomPick.length; i++) {
    correctLettersToDisplay.push("_");
  }
}

// Randomly chooses a choice from the options array. This is the Computer's guess.
var computerRandomPick = computerChoices[Math.floor(Math.random() * computerChoices.length)];
console.log(computerRandomPick);

//start playing the singer's song clip
var audioFileName = "../Hangman-Game/assets/sounds/" + computerRandomPick + "Clip.mp3";
console.log(audioFileName);
var audio = new Audio(audioFileName);
audio.loop = true;
audio.play();

function pauseAudio() {
    audio.pause();
}

function playAudio() {
    audio.play();
}

var winner=false;
var hangYou=true;

emptyLettersInFeedbackScreen(computerRandomPick);

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i+1);
    }
    return indexes;
}

function updateNameInFeedbackWindow(userGuess){
  // var position = computerRandomPick.indexOf(userGuess)+1;
  var position = getAllIndexes(computerRandomPick,userGuess);
  console.log("Position is: "+ position);
  for (var i = 0; i < position.length; i++) {
    correctLettersToDisplay[(position[i]-1)]=userGuess;
  }
  var withoutCommasButBlanks=correctLettersToDisplay.join(' ');
  console.log(withoutCommasButBlanks);
  // document.getElementById("feedbackName").innerHTML=correctLettersToDisplay;
  document.getElementById("feedbackName").innerHTML=withoutCommasButBlanks;
}

function loadUrl(newLocation){
window.location = newLocation;
return false;
}


// document.onkeyup = getUserLetterGuess();
document.onkeyup = function(event) {

    // //Test if the game has been won or lost.
    // if (computerRandomPick==correctLettersToDisplay.join('')){
    //   alert("You are the winner!");
    // }
    // if (guessesRemaining===0) {
    //   alert("You lose!");
    // }

    // Determines which key was pressed and if it is an alphabet key.
    if ((event.which < 65) || (event.which > 90)){
       alert(event.key+" is not an alphabet. Try again!");
       //BUZZER???
    }
    else {
      var userGuess = event.key.toUpperCase();
      console.log(userGuess);
      if (computerRandomPick.indexOf(userGuess)!==-1) {
        //User guessed RIGHT!
        console.log("Correct!");
        if (correctLettersToDisplay.indexOf(userGuess)!==-1) {
          //Alert user that this letter has been guessed before!
          alert("You have guessed the same correct letter before. Try again!");
        }
        else{
          updateNameInFeedbackWindow(userGuess);
          //Test if the game has been WON!
          // if (computerRandomPick==correctLettersToDisplay.join('')){
          //   alert("You WIN!");
        }
        if (computerRandomPick==correctLettersToDisplay.join('')){
          // alert("You WIN!");
          var withoutCommas="../Hangman-Game/assets/images/"+correctLettersToDisplay.join('')+".jpg";
          // document.getElementById("feedbackName").innerHTML=correctLettersToDisplay;
          document.getElementById("gameIconOrBand").innerHTML= '<img src="'+ withoutCommas +'">';

          //Let's now play a good snippet of the song as a parting gift
          withoutCommas="../Hangman-Game/assets/sounds/"+correctLettersToDisplay.join('')+".mp3";
          var audio = new Audio(withoutCommas);
          audio.loop = false;
          audio.play();
          setTimeout(delayFunction,6000);
          function delayFunction(){
            //   GOOD BYE from this HTML
            loadUrl("youWin.html");
            // alert("Hello");
          }
        }
      }
      else{
        //User guessed WRONG!!
        console.log("Wrong Guess!");
        if (lettersAlreadyGuessed.indexOf(userGuess)===-1) {
          //User has not incorrectly guessed this letter before.
            guessesRemaining--;
            document.getElementById("resultsGuessesRemaining").innerHTML=guessesRemaining;
            lettersAlreadyGuessed.push(userGuess);
            console.log(lettersAlreadyGuessed);
            document.getElementById("resultsLettersGuessed").innerHTML=lettersAlreadyGuessed;
            //Test if the game has been LOST!
            if (guessesRemaining===0) {
            //YOU LOSE!!
            var anotherwithoutCommas="../Hangman-Game/assets/images/"+correctLettersToDisplay.join('')+".jpg";
            // document.getElementById("feedbackName").innerHTML=correctLettersToDisplay;
            document.getElementById("gameIconOrBand").innerHTML= '<img src="'+ anotherwithoutCommas +'">';

            //Let's now play a good snippet of the song as a parting gift
            anotherwithoutCommas="../Hangman-Game/assets/sounds/"+correctLettersToDisplay.join('')+".mp3";
            var anoaudio = new Audio(anotherwithoutCommas);
            anoaudio.loop = false;
            anoaudio.play();
            // alert("You LOSE!");
            setTimeout(delay2Function,6000);
              function delay2Function(){
                //   GOOD BYE from this HTML
                //BYE-BYE
                loadUrl("hangman.html");
                // alert("Hello");
              }
            }
         }
      }
    }

};
