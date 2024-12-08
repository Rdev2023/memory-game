/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

//listener for create Deck

const deck = document.getElementsByClassName("deck")[0];
const movesEl = document.getElementsByClassName("moves")[0];
const starsEl = document.getElementsByClassName("fa-star");
const yellowStars = document.getElementsByClassName("fa-2x");
const watchEl = document.getElementsByClassName("stopWatch")[0];
movesEl.innerHTML=0;

var gameNumber = 1; // for counting game
var clickNum = gameNumber*100000;
var match = 0;
var starsNum = 3;
var lastCard = {}; //for protect two time open same card
var startTime = new Date;//start watch
var endTime;
var timer;
var successCount = 10;//countDown opening card  for killing stars
var msg = "One more game ?";
deck.addEventListener("click",flipOver);
var flipMap = new  Map();
const repeatButton = document.getElementsByClassName("restart")[0];
repeatButton.addEventListener("click",restart);
var timeCounter = setInterval("stopWatch()", 500);

function restart(){
  gameNumber++; //increase count of game
  deck.innerHTML = "";
  createDeck(4);
  movesEl.innerHTML=0;
  match = 0;
  timeCounter = setInterval("stopWatch()", 500); //start count time again
  successCount = 10;
  starsNum = 3;
  clickNum = gameNumber*100000; // counting moves every games outstanding each other
  for (let i = 0; i<starsEl.length;i++){
    starsEl[i].setAttribute("style", "color: yellow;");
    starsEl[i].classList.add("fa-2x");
  }
  flipMap.clear();
}

function flipOver(evt) { //Event handler function
  if (flipMap.size>1) return false; //deny open more than two cards
  if (flipMap.size&&(evt.target==flipMap.get(clickNum))) return false; // protected from click opened card
  clickNum++;//Counting clicks
  movesEl.innerHTML=clickNum - gameNumber*100000;//number of moves;
  let cardNum = clickNum;
  successCount--;//countdown moves for delete star
  if (successCount === 0) { //checking condition to delete star
    successCount = 10-match; //for next circle
    if (starsNum>0){
      starsNum--;
    };
    starsKill(starsNum);
  }
  flipMap.set(cardNum,evt.target);
  flipMap.get(cardNum).classList.add("show","open");
   setTimeout(function(){ //start function to flip over back a card
     if(flipMap.has(cardNum)){ //avoiding case when card already matched and flipMap will be cleared.
       flipMap.get(cardNum).classList.remove("show","open");
       flipMap.delete(cardNum);
     }
   },3000);
  if (flipMap.size>1) {  //Check match two cards
    if (flipMap.get(cardNum).children[0].classList[1] === flipMap.get(cardNum-1).children[0].classList[1]) {
      flipMap.get(cardNum).classList.add("match");
      flipMap.get(cardNum-1).classList.add("match");
      flipMap.clear();
      match++;
      successCount = 10-match;
      if (match == 8) {
        clearInterval(timeCounter);
        setTimeout(function(){ //function for alert messages
          let rate;
          if (yellowStars.length == 3) rate = "high level";
          if (yellowStars.length == 2) rate = "medium level";
          if (yellowStars.length == 1) rate = "low level";
          if (yellowStars.length == 0) rate = "very bad";
          alert(`You win!!!
Your result: ${watchEl.innerHTML} seconds.
Your memmory rate is: ${rate}`);
          let confirmMsg = confirm(msg);
          if (confirmMsg){
            restart();
          }
          else {
            return false;
          };
        },500);//specificied delay time

      }
    }
  }
}

function createCardsArray(n){
  let symbolsArray = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];
  let cardsArray = [];
  let j=0;
  for (let i = 0; i < n*n; i++) {
    let iElement = document.createElement("i");
    iElement.classList.add("fa");
    j++;
    if (j>7){
      j=0;
    }
    iElement.classList.add(symbolsArray[j]);
    let li = document.createElement("li");
    li.appendChild(iElement);
    li.classList.add("card");
    cardsArray[i] = li;
  }
  shuffle(cardsArray);
  return cardsArray;
}

function createDeck(n){ //Fiilling deck by cards
  deck.innerHTML = "";
  startTime = new Date; //set timer to zero
  let array = createCardsArray(n);
  let fragment = document.createDocumentFragment();
  for (let i=0;i<array.length;i++) {
    fragment.appendChild(array[i]);
  }
  deck.appendChild(fragment);
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function stopWatch() {
  endTime = new Date;
  timer = endTime-startTime;
  let hours = Math.floor(timer/3600000);
  let minutes = Math.floor((timer/60000)-hours*60);
  let seconds = Math.floor((timer/1000)-minutes*60);
  if (hours<10) hours = "0"+hours;
  if (minutes<10) minutes = "0"+minutes;
  if (seconds<10) seconds = "0"+seconds;
  watchEl.innerHTML = hours+":"+minutes+":"+seconds;
}

function starsKill(s){ //function for killing stars
  starsEl[s].style.cssText="color: black; transition: font-size 3s";
  starsEl[s].classList.remove("fa-2x");
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
