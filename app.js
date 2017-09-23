const querty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const reset = document.querySelector('a.btn__reset');

const phrases = [
  'OLD MCDONALD HAD A FARM',
  'WHAT DO YOU MEAN',
  'NO WAY DUDE',
  'I LIKE TRAINS',
  'THERES AN APP FOR THAT'
];
let missed = 0;

const getRandomPhraseAsArray = (arr) => {
  length = arr.length;
  
  let randomPhrase = arr[Math.floor(length * Math.random())];
  let letters = randomPhrase.split('');
  return letters;
}

const addPhraseToDisplay = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const ul = document.querySelector('#phrase ul');
    
    let li = document.createElement('li');
    li.textContent = arr[i];
    li.className = "letter";
    ul.appendChild(li);
  }
}

reset.addEventListener('click', () => {
  const overlay = document.querySelector('#overlay');
  
  overlay.style.display = "none";

});

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);