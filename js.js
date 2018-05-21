document.addEventListener('DOMContentLoaded', function(){
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

  function timer(){
    let displaySeconds = document.querySelector('.seconds');
    let displayMinutes = document.querySelector('.minutes');
    let seconds = 0;
    let minutes = 0;
    setInterval(function(){
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

  

// e.target.nextElementSibling.children[0].classList[1]
  function flipCards(e){
    if(moves === 1){
      timer();
      movesTracker();
      e.target.offsetParent.classList.add('flipped', 'card-1');
    } else if(moves % 2 === 0){
      movesTracker();
      e.target.offsetParent.classList.add('flipped', 'card-2');
      window.setTimeout(function(){
        document.querySelector('.card-1').classList.remove('flipped', 'card-1');
        document.querySelector('.card-2').classList.remove('flipped', 'card-2');
      }, 1500);
    } else {
      movesTracker();
      e.target.offsetParent.classList.add('flipped', 'card-1');
    } 
  }

  function startGame(){
    startGameButton.textContent = "Start Over";
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