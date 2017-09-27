const reset = document.querySelector('a.btn__reset');


reset.addEventListener('click', () => {
  const overlay = document.querySelector('#overlay');
  
  overlay.style.display = "none";

});


const phrases = [
  'MY NAME IS JEFF',
  'WHAT DO YOU MEAN',
  'NO WAY DUDE',
  'I LIKE TRAINS',
  'CASEY NEISTAT'
];

const phrase = document.getElementById('phrase');
const phraseUL = document.querySelector('#phrase ul');

const qwerty = document.getElementById('qwerty');

let missed = 0;



const getRandomPhraseAsArray = (arr) => {
  length = arr.length;
  
  let randomPhrase = arr[Math.floor(length * Math.random())];
  let letters = randomPhrase.split('');
  return letters;
};

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

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Check for letter match between all the display letters and supplied element
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
      return displayLetter;
    } else {
      console.log('No Match')
      console.log(displayLetter);
      console.log(qwertyLetter);
    }
  }
  console.log("THIS IS INCREDIBLY SAD")
  return null;
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
    let letterFound = checkLetter(button);
    
    // Scoring
    if (letterFound == null) {
      missed++;
      console.log("You've now missed " + missed);
    }
    checkWin();
  }
});











