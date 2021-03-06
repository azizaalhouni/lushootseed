'use strict';

var arrayOfFlashcards = [];
var numFlashcardsShown = 0;
var imgEl = document.getElementById('picture_tag');
var liElEng = document.getElementById('english_translation');
var liElLus = document.getElementById('lushootseed_translation');
var buttonNextFlashcard = document.getElementById('next_flashcard');
var buttonTakeTest = document.getElementById('take_test');
var flashcardAudio = document.getElementById('flashcard_audio');
var timesAllShown = 0;

buttonNextFlashcard.addEventListener('click', displayFlashcard);

function Flashcard(eng, lush, url, idNum, sound, phonetic) {
  this.english = eng;
  this.lushootseed = lush;
  this.pictureurl = url;
  this.idNum = idNum;
  this.sound = sound;
  this.phonetic = phonetic;
  this.shown = false;
  this.timesShown = 0;
  arrayOfFlashcards.push(this);
}

function makeFlashcards() {
  new Flashcard('carrot','\u0161\u0259g\u02B7aq', 'image/wordphotos/carrots.jpeg', 1, 'soundFiles/carrots.wav', 0);
  new Flashcard('salmon','s\u0294uladx\u02B7', 'image/wordphotos/salmon.jpg', 2, 'soundFiles/salmon.wav', 0);
  new Flashcard('oyster', '\u019B\u0315ux\u030C\u02B7\u019B\u0315ux\u030C\u02B7', 'image/wordphotos/oyster.jpeg', 3, 'soundFiles/oyster.wav', 0);
  new Flashcard('coffee', 'kupi', 'image/wordphotos/coffee.jpg', 4, 'soundFiles/coffee.wav', 0);
  new Flashcard( 'berry/fruit','sq\u0313\u02B7\u0259la\u026C\u0259d', 'image/wordphotos/berries.jpeg', 5, 'soundFiles/berry.wav', 0);
  new Flashcard('soup','s\u026Cub', 'image/wordphotos/soup.jpg', 6, 'soundFiles/soup.wav', 0);
  new Flashcard('eggs','\u0294\u0259\u0294us', 'image/wordphotos/eggs.jpg', 7, 'soundFiles/eggs.wav', 0);
  new Flashcard('clam', 's\u0294ax\u030C\u02B7u\u0294','image/wordphotos/clam.jpeg', 8, 'soundFiles/clam.wav', 0);
  new Flashcard('mussels','tulq\u02B7', 'image/wordphotos/mussels.jpeg', 9, 'soundFiles/mussel.wav', 0);
  new Flashcard('crab','b\u0259sq\u02B7', 'image/wordphotos/crab.jpg', 10, 'soundFiles/crab.wav', 0);
  new Flashcard('geoduck', 'g\u02B7id\u0259q','image/wordphotos/geoduck.jpg', 11, 'soundFiles/geoduck.wav', 0);
  new Flashcard('potatoes', 'spiq\u02B7uc','image/wordphotos/potatoes.jpg', 12, 'soundFiles/potatoes.wav', 0);
  new Flashcard('octopus', 'sqibk\u0313\u02B7', 'image/wordphotos/octopus.jpg', 13, 'soundFiles/octopus.wav', 0);
}

var generateRandomNumber = function() {
  return Math.floor(Math.random() * (arrayOfFlashcards.length));
};

function delimitRandom(){
  var placeholder = generateRandomNumber();
  while(arrayOfFlashcards[placeholder].timesShown > timesAllShown){
    placeholder = generateRandomNumber();
  }
  return placeholder;
}

function displayFlashcard() {
  limitDuplicates();
  var placeholder = delimitRandom();
  arrayOfFlashcards[placeholder].shown = true;
  imgEl.src = arrayOfFlashcards[placeholder].pictureurl;
  liElEng.textContent = arrayOfFlashcards[placeholder].english;
  liElLus.textContent = arrayOfFlashcards[placeholder].lushootseed;
  flashcardAudio.src = arrayOfFlashcards[placeholder].sound;
  numFlashcardsShown++;
  arrayOfFlashcards[placeholder].timesShown++;
  localStorage.setItem('arrayOfFlashcards', JSON.stringify(arrayOfFlashcards));
  showTestButton();
}

function limitDuplicates(){
  if (numFlashcardsShown === arrayOfFlashcards.length){
    timesAllShown++;
    numFlashcardsShown = 0;
  }
}

function showTestButton() {
  if(numFlashcardsShown > 6) {
    buttonTakeTest.className = 'show_take_test';
  }
}

if(localStorage.arrayOfFlashcards) {
  var eWord = JSON.parse(localStorage.getItem('arrayOfFlashcards'));
  if(eWord.length < 7) {
    makeFlashcards();
  }
  else {
    arrayOfFlashcards = eWord;
    for(var i = 0; i < arrayOfFlashcards.length; i++) {
      if(arrayOfFlashcards[i].timesShown >= 1) {
        arrayOfFlashcards[i].timesShown = 1;
        numFlashcardsShown++;
      }
    }
  }
} else {
  makeFlashcards();
}
displayFlashcard();
