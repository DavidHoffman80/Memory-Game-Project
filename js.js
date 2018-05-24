document.addEventListener('DOMContentLoaded', function(){
  // Hide the modals
  let winningModal = document.getElementById('winning-modal');
  let instrModal = document.getElementById('instructions');
  winningModal.style.display = 'none';
  instrModal.style.display = 'none';

  // Add event listener to the "instructions" button
  let instrButton = document.querySelector('.instructions');
  instrButton.addEventListener('click', function(){
    instrModal.style.display = '';
  });

  // Add event listener to the "close instructions" button
  let closeInstructions = document.querySelector('.close-instructions');
  closeInstructions.addEventListener('click', function(){
    instrModal.style.display = 'none';
  });

  // Add event listener to the "start game" button
  let startGameButton = document.querySelector('.start-game');
  startGameButton.addEventListener('click', startGame);

  // Variables
  let myTimer;
  let seconds = 0;
  let minutes = 0;
  let moves = 1;
  let card_one;
  let card_two;
  let matches = 0;
  let turn = 0;
  let stars = 5;

  // start game function
  function startGame(){
    startOver();
    startGameButton.textContent = 'Restart!';
    const randomCards = shuffleCards();
    const cardsArr = randomCards.slice();
    let card = document.querySelectorAll('.card');
    card.forEach(function(item, index, arr){
      if(index === 0){
        let cardHtml = `<div class="card-container card${index + 1}"><div class="card-back"></div><div class="card-front"><i class="${randomCards[index]}"></i></div></div>`;
        item.innerHTML = cardHtml;
        item.style.color = "white";
        item.classList.remove('start');
      } else {
        let cardHtml = `<div class="card-container card${index + 1}"><div class="card-back"></div><div class="card-front"><i class="${cardsArr[index]}"></i></div></div>`;
        item.innerHTML = cardHtml;
        item.style.color = "white";
        item.classList.remove('start');
      }
    });
    let gameBoard = document.querySelector('#game');
    gameBoard.addEventListener('click', flipCards);
  }

  // start over function
  function startOver(){
    clearInterval(myTimer);
    seconds = 0;
    minutes = 0;
    moves = 1;
    matches = 0;
    turn = 0;
    stars = 5;
    document.querySelector('.seconds').textContent = seconds;
    document.querySelector('.minutes').textContent = minutes;
    document.querySelector('.moves-count').textContent = turn;
    starsStructure();
  }

  // Shuffle the cards function
  // Fisher Yates algorithm
  function shuffleCards() {
    let cardsArray = [
      "fab fa-android fa-5x",
      "fab fa-android fa-5x",
      "fab fa-apple fa-5x",
      "fab fa-apple fa-5x",
      "fab fa-chrome fa-5x",
      "fab fa-chrome fa-5x",
      "fab fa-css3-alt fa-5x",
      "fab fa-css3-alt fa-5x",
      "fab fa-html5 fa-5x",
      "fab fa-html5 fa-5x",
      "fab fa-js-square fa-5x",
      "fab fa-js-square fa-5x",
      "fas fa-bolt fa-5x",
      "fas fa-bolt fa-5x",
      "fas fa-crosshairs fa-5x",
      "fas fa-crosshairs fa-5x"
    ];
    let i = cardsArray.length, j, temp;
    while(--i > 0){
      j = Math.floor(Math.random() * (i+1));
      temp = cardsArray[j];
      cardsArray[j] = cardsArray[i];
      cardsArray[i] = temp;
    }
    return cardsArray;
  }

  // Flip cards function
  function flipCards(e){
    if(e.target.className === 'card-back'){
      if(moves === 1){
        timer();
        movesTracker();
        e.target.offsetParent.classList.add('flipped', 'card-1');
        isMatched(e);
      } else if(moves % 2 === 0){
        movesTracker();
        e.target.offsetParent.classList.add('flipped', 'card-2');
        isMatched(e);
      } else {
        movesTracker();
        e.target.offsetParent.classList.add('flipped', 'card-1');
        isMatched(e);
      }
    }
  }

  // timer function
  function timer(){
    let displaySeconds = document.querySelector('.seconds');
    let displayMinutes = document.querySelector('.minutes');
    myTimer = setInterval(function(){
      if(seconds < 59){
        seconds++;
        displaySeconds.textContent = seconds;
      } else {
        minutes++;
        displayMinutes.textContent = minutes;
        seconds = 0;
        displaySeconds.textContent = seconds;
      }
    }, 1000);
  }

  // Moves Tracker function
  function movesTracker(){
    moves++;
  }

  // is matched function
  function isMatched(e){    
    if(e.target.offsetParent.classList[3] === 'card-1'){
      card_one = e.target.nextElementSibling.children[0].classList[1];
    } else if(e.target.offsetParent.classList[3] === 'card-2'){
      card_two = e.target.nextElementSibling.children[0].classList[1];
      updateMoves();
      if(card_one == card_two){
        matches++;
        document.querySelector('.card-1').children[1].classList.add('matched');
        document.querySelector('.card-2').children[1].classList.add('matched');
        document.querySelector('.card-1').classList.remove('card-1');       
        document.querySelector('.card-2').classList.remove('card-2');
        if(matches === 8){
          youWon();
        }
      } else{
        document.querySelector('.card-1').children[1].classList.add('no-match');
        document.querySelector('.card-2').children[1].classList.add('no-match');
        window.setTimeout(function(){
          document.querySelector('.card-1').children[1].classList.remove('no-match');
          document.querySelector('.card-2').children[1].classList.remove('no-match');
          document.querySelector('.card-1').classList.remove('flipped', 'card-1');
          document.querySelector('.card-2').classList.remove('flipped', 'card-2');
        }, 750);
      }
    }
  }

  // Stars Tracker function
  function starsTracker(){
    if(turn <= 10){
      stars = 5;
      starsStructure();
    } else if(turn > 10 && turn <= 13){
      stars = 4;
      starsStructure();
    } else if(turn > 13 && turn <= 16){
      stars = 3;
      starsStructure();
    } else if(turn > 16 && turn <= 19){
      stars = 2;
      starsStructure();
    } else{
      stars = 1;
      starsStructure();
    }
  }

  // StarsStructure function
  function starsStructure(){
    let starsPlacement = document.querySelector('.star-counter');
    let starsStructureHTML = "";
    for(let i = stars; i > 0; i--){
      starsStructureHTML += '<i class="fas fa-star"></i>';
    }
    starsPlacement.innerHTML = starsStructureHTML;
  }

  // update moves function
  function updateMoves(){
    turn++;
    let movesCounter = document.querySelector('.moves-count');
    movesCounter.textContent = turn;
    starsTracker();
  }

  // You won function
  function youWon(){
    clearInterval(myTimer);
    let finalMoves = document.querySelector('.total-moves-count');
    let finalMinutes = document.querySelector('.total-time-count-min');
    let finalSeconds = document.querySelector('.total-time-count-sec');
    let closeBtn = document.querySelector('.close');
    window.setTimeout(function(){
      winningModal.style.display = '';
      closeBtn.style.cursor = 'pointer';
      finalMoves.textContent = turn;
      finalMinutes.textContent = minutes;
      finalSeconds.textContent = seconds;
      let closeModal = document.getElementById('close-congrats-modal');
      closeModal.addEventListener('click', function(e){
        winningModal.style.display = 'none';
        startGame();
      });
    }, 500);
    let finalStars = document.querySelector('.final-stars');
    let starsHTML = "";
    for(let i = stars; i > 0; i--){
      starsHTML += '<i class="fas fa-star"></i>';
    }
    finalStars.innerHTML = starsHTML;
  }
});