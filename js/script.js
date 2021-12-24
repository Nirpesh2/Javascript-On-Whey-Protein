//challenge 1: Your age in Days
function ageInDays() {
  var birthYear = prompt("What is your bithyear , my friend??")
  var ageInDayss = (2021 - birthYear) * 365;
  var h1 = document.createElement("h1");
  var nodeText = document.createTextNode('You are ' + ageInDayss + ' days old');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(nodeText);
  document.getElementById('flex-box-result').appendChild(h1);

}

function reset() {
  document.getElementById('ageInDays').remove();
}


//challenge 2: Cat generator
function catGen() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-gen');
  image.src = "https://cdn2.thecatapi.com /images/12r.gif";
  div.appendChild(image);
}

//challenge 3: Rock, paper, scissors
function rpsGame(yourChoice){
  console.log(yourChoice);

  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = NumtoChoice(RantoInt());
 
  results = decideWinner(humanChoice,botChoice);
  message = finalMessage(results);
  rpsfrontEnd(yourChoice.id, botChoice, finalMessage(results));
 
  console.log('You pick:',humanChoice);
  console.log('Computer pick:',botChoice);
  console.log(results);
}
  
//random number generator
function RantoInt(){
  return Math.floor(Math.random() * 3);
}

//number to choice 
function NumtoChoice(number){
  return ['rock','paper','scissors'][number];
}

//deciding winner
function decideWinner(yourChoice,computerChoice){
  var rpsDatabase ={

    'rock': {'rock': 0.5 , 'scissors':1 ,'paper':0},
    'paper': {'rock':1, 'scissors':0 ,'paper':0.5},
    'scissors': {'rock':0, 'scissors': 0.5 ,'paper':1},

  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var botScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore,botScore];
}

//message 
function finalMessage([yourScore,botScore]){
  if (yourScore === 0 ){
    return{'message': 'You Lost!', 'color': 'red'}
  }else if (yourScore === 0.5){
    return{'message': 'You Tied!', 'color': 'blue'} 
  }else{
    return{'message': 'You Win!', 'color': 'green'}

  }
}

//front end
function rpsfrontEnd(humanImageChoice, botImageChoice,finalMessage){
  var imageDatabase = {
    'rock':  document.getElementById('rock').src,
    'paper':  document.getElementById('paper').src,
    'scissors':  document.getElementById('scissors').src,
  };

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src ='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>"
  messageDiv.innerHTML = "<h1 style='color: "+ finalMessage['color']+"; font-size:40px; padding:30px;'>" +finalMessage['message']+ "</h1> "
  botDiv.innerHTML = "<img src ='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(255,0,0,1);'>"

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
  
}


//changing the colors of the buttons
var allButtons = document.getElementsByTagName('button');


var copyAllButtons = [];

for (let i = 0; i < allButtons.length; i++) {
  copyAllButtons.push(allButtons[i].classList[1]);
}
console.log(copyAllButtons);


function changeButtonColor(color) {
  if (color.value === 'red'){
    getColorRed();
  }else if (color.value ==='green'){
    getColorGreen();
  }else if (color.value === 'yellow'){
    getColorYellow();
  }else if (color.value === 'reset'){
    ColorReset();
  }else if (color.value === 'random'){
    getRandomcolor();
  }
}


function getColorRed(){
  for (let i= 0; i< allButtons.length; i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-danger');
  }
}
function getColorGreen(){
  for (let i= 0; i< allButtons.length; i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-success');
  }
}
function getColorYellow(){
  for (let i= 0; i< allButtons.length; i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-warning');
  }
}

function ColorReset(){
  for (let i= 0; i< allButtons.length; i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(copyAllButtons[i]);
  }
}

function getRandomcolor(){
  let choice = ['btn-danger','btn-success','btn-primary', 'btn-warning'];
  for (let i= 0; i< allButtons.length; i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(choice[Math.floor(Math.random()*4)]);
  }
}

//blackjack game mode
let blackjackGame = {
  'you': {'scorespan':'#your-blackjack-result','div': '#your-block','score':0},
  'dealer': {'scorespan':'#dealer-blackjack-result','div': '#dealers-block','score':0},
  'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardsMaps': { '2': 2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10, 'K':10, 'J':10, 'Q':10,'A':[1,11]},
  'wins': 0,
  'losses': 0,
  'draws': 0, 
  'isStand': false,
  'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit() {
  if (blackjackGame['isStand'] === false){
    let card = randomCard();
    showCard(card,YOU);
    updateScore(card, YOU);
    showScore(YOU);

  }
}

function randomCard(){
  let randomIndex = Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
  if (activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `images/cardsimages/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();

  }
}

function blackjackDeal(){
  //showResult(computeWinner());
  if (blackjackGame['turnsOver'] === true){
    blackjackGame['isStand'] = false;
    let yourImages = document.querySelector('#your-block').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealers-block').querySelectorAll('img');

    for (let i= 0; i< yourImages.length; i++){
      yourImages[i].remove();
    }
    for (let i= 0; i< dealerImages.length; i++){
      dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#blackjack-span').textContent = "Let's Play";
    
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color  = '#ffffff';
    document.querySelector('#blackjack-span').style.color  = '#212529';

    blackjackGame['turnsOver'] = false;

  }
}

function updateScore(card,activePlayer){
  
  if (card === 'A'){
    //if adding 11 keeps me below 21, add 11 else add 1
    if (activePlayer['score'] + blackjackGame['cardsMaps'][card][1] <= 21 ){
      activePlayer['score'] += blackjackGame['cardsMaps'][card][1];
    } else{
      activePlayer['score'] += blackjackGame['cardsMaps'][card][0];
    }
  }else{
    activePlayer['score'] += blackjackGame['cardsMaps'][card];

  }

}

function showScore(activePlayer){
  if (activePlayer['score'] > 21){
    document.querySelector(activePlayer['scorespan']).textContent = 'BUST';
    document.querySelector(activePlayer['scorespan']).style.color = 'red';
  }else{
    document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame['isStand'] = true;
  while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  
  blackjackGame['turnsOver'] = true;
  let winner = computeWinner();
  showResult(winner);
  
}


//compute winner and decide who just won
//update the wins, losses and draws
function computeWinner(){
  let winner;

  if (YOU['score'] <=21){
    //condition: higher score than dealer or when dealer bustes but you're not the winner
    if ((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)){
      blackjackGame['wins']++;
      winner = YOU;
       
    }else if (YOU['score'] < DEALER['score']){
      blackjackGame['losses']++;
      winner = DEALER;
    }else if (YOU['score'] === DEALER['score']){
      blackjackGame['draws']++;
    }
  //when you bust but dealer doesnt
  }else if ((YOU['score'] > 21) && DEALER['score'] <= 21){
    blackjackGame['losses']++;
    winner = DEALER;

  //when you and dealer both bust
  }else if ((YOU['score'] > 21) && (DEALER['score'] >21)){
    blackjackGame['draws']++;
  }

  console.log('Winner is', winner);
  return winner; 
}

function showResult(winner){
  if(blackjackGame['turnsOver'] === true){
    let message, messageColor;

    if (winner === YOU){
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = 'You Win!!!';
      messageColor = 'green';
      winSound.play();
    }else if (winner === DEALER){
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You Lost!!!';
      messageColor = 'red';
      lossSound.play();
    }else{
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You Drew!!!';
      messageColor = 'black';
    }

    document.querySelector('#blackjack-span').textContent = message;
    document.querySelector('#blackjack-span').style.color = messageColor;
  }
}