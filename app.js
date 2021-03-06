const phrases = [
  'MY NAME IS JEFF',
  'I SMELL LIKE BEEF',
  'WHAT DO YOU MEAN',
  'NO WAY DUDE',
  'I LIKE TRAINS',
  'CASEY NEISTAT'
];

const phrase = document.getElementById('phrase');
const phraseUL = document.querySelector('#phrase ul');

const qwerty = document.getElementById('qwerty');
const qwertyButtons = document.querySelectorAll('#qwerty button');
let missed = 0;

let scoreBoard = document.querySelector('#scoreboard')
let hearts = scoreBoard.querySelectorAll("img[src*='live']");

// Get a phrase
const getRandomPhraseAsArray = (arr) => {
  length = arr.length;
  
  let randomPhrase = arr[Math.floor(length * Math.random())];
  let letters = randomPhrase.split('');
  return letters;
};

// Add it to the display
const addPhraseToDisplay = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    li.textContent = arr[i];
    
    if (arr[i] !== " ") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
    phraseUL.appendChild(li);
  }
};

// and reset the scoreboard.
const resetScore = () => {
  missed = 0;
  hearts.forEach((heart) => {
    heart.src = 'images/liveHeart.png';
  });
}

// LISTEN for click "Play Again": Set the Game
document.addEventListener('click', (e) => {
  if (e.target.className == "btn__reset") {
    const overlays = document.querySelectorAll('#overlay');
    
    for (let i = 0; i < overlays.length; i++) {
      overlays[i].style.display = "none";
    }
    
    while (phraseUL.hasChildNodes()) {
      phraseUL.removeChild(phraseUL.lastChild);
    }
    qwertyButtons.forEach((button) => {
      button.className = "";
    });
    
    let phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    resetScore();
  }
});


// Check if the argument letter matches against all display letters
// return letterFound or null
const checkLetter = (button) => {
  let letterList = document.querySelectorAll('#phrase .letter');
  
  
  for (let i = 0; i < letterList.length; i++) {
    let letterListItem = letterList[i];
    let displayLetter = letterListItem.textContent;
    let qwertyLetter = button.textContent.toUpperCase();
    
    if (displayLetter == qwertyLetter) {
      letterListItem.classList.add("show");
      console.log('MATCH!!!')
      console.log(displayLetter);
      console.log(qwertyLetter);
      var letterFound = displayLetter;
    } else {
      console.log('No Match');
      console.log(displayLetter);
      console.log(qwertyLetter);
    }
  }
  if (letterFound) {
      return letterFound;
  } else {
    console.log("THIS IS INCREDIBLY SAD");
    return null;
  }
};

// Check if all letters have matched
const checkWin = () => {
  let overlayWin = document.querySelector('#overlay.win');
  let overlayLose = document.querySelector('#overlay.lose');
  
  let lettersShown = phraseUL.querySelectorAll('.show');
  let lettersDisplayed = phraseUL.querySelectorAll('.letter');
  let matches = lettersShown.length;
  let letters = lettersDisplayed.length;
  
  if (matches == letters) {
    overlayWin.style.display = "flex";
  } else if (missed >= 5) {
    overlayLose.style.display = "flex";
  }
};

qwerty.addEventListener('click', (event) => {
  if (event.target.tagName == "BUTTON") {
    // Check for Matching Letters
    let button = event.target;
    
    console.log("Button " + button.textContent + " Clicked")
    button.classList.add("chosen");
    button.setAttribute("disabled", "");
    let letterFound = checkLetter(button);
    
    // Scoring
    let liveHearts = scoreBoard.querySelectorAll("img[src*='live']");
    
    if (letterFound == null) {
      missed++;
      liveHearts[liveHearts.length - 1].src = 'images/lostHeart.png';
      
      console.log("You've now missed " + missed);
    }
    checkWin();
  }
});