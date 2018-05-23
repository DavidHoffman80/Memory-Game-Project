document.addEventListener('DOMContentLoaded', function(){
  // Hide the modal
  let modal = document.getElementById('modal');
  modal.style.display = 'none';

  // Shuffle the cards function
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

  let myTimer;
  let seconds = 0;
  let minutes = 0;
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

  let moves = 1;
  function movesTracker(e){
    moves++;
  }

  function finalStarsCreator(){
    
  }

  function youWon(){
    clearInterval(myTimer);
    let finalMoves = document.querySelector('.total-moves-count');
    let finalMinutes = document.querySelector('.total-time-count-min');
    let finalSeconds = document.querySelector('.total-time-count-sec');
    let closeBtn = document.querySelector('.close');
    window.setTimeout(function(){
      modal.style.display = '';
      closeBtn.style.cursor = 'pointer';
      finalMoves.textContent = turn;
      finalMinutes.textContent = minutes;
      finalSeconds.textContent = seconds;
      let closeModal = document.querySelector('.close');
      closeModal.addEventListener('click', function(e){
        modal.style.display = 'none';
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

  let card_one;
  let card_two;
  let matches = 0;
  let turn = 0;
  let stars = 5;

  function starsStructure(){
    let starsStructureHTML = "";
    for(let i = stars; i > 0; i--){
      starsStructureHTML += '<i class="fas fa-star"></i>';
    }
    starsPlacement.innerHTML = starsStructureHTML;
  }

  let starsPlacement = document.querySelector('.star-counter');
  function starsTracker(){
    
    if(turn <= 9){
      stars = 5;
      starsStructure();
    } else if(turn > 9 && turn <= 12){
      stars = 4;
      starsStructure();
    } else if(turn > 12 && turn <= 14){
      stars = 3;
      starsStructure();
    } else if(turn > 14 && turn <= 17){
      stars = 2;
      starsStructure();
    } else{
      stars = 1;
      starsStructure();
    }
  }

  function updateMoves(){
    turn++;
    let movesCounter = document.querySelector('.moves-count');
    movesCounter.textContent = turn;
    starsTracker();
  }

  function isMatched(e){    
    if(e.target.offsetParent.classList[3] === 'card-1'){
      card_one = e.target.nextElementSibling.children[0].classList[1];
    } else if(e.target.offsetParent.classList[3] === 'card-2'){
      card_two = e.target.nextElementSibling.children[0].classList[1];
      if(card_one == card_two){
        matches++;
        document.querySelector('.card-1').children[1].classList.add('matched');
        document.querySelector('.card-2').children[1].classList.add('matched');
        // document.querySelector('.card-1').classList.add('matched');
        // document.querySelector('.card-2').classList.add('matched');
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
        }, 1000);
      }
    }
  }

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
        updateMoves();
      } else {
        movesTracker();
        e.target.offsetParent.classList.add('flipped', 'card-1');
        isMatched(e);
      }
    }
  }

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

  function startGame(){
    startOver();
    // startGameButton.textContent = "Start Over";
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
  
  let startGameButton = document.querySelector('.start-game');
  startGameButton.addEventListener('click', startGame);
});