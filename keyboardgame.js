let choseGame = document.getElementById("choseGame");
let alphShow = document.getElementById("alphShow");
let manuPlaGame = document.getElementById("manuPlaGame");
let RandomAlphShow = document.getElementById("RandomAlphShow");
let stopwatch = document.getElementById("stopwatch");
let alphabet = document.getElementById("alphabet");
let mistakeElement = document.getElementById("mistake");
let rightKeyElement = document.getElementById("rightKey");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let scoreElement = document.getElementById("score");
let startGame = document.getElementById("startGame");
let gameOver = document.getElementById("gameOver");
let dropdownMenuButton = document.getElementById("dropdownMenuButton");
let dropdownMenu = document.getElementById("dropdownMenu");
let displayScore = document.querySelector(".displayScore");
let displayMis = document.querySelector(".displayMis");
let displayRig = document.querySelector(".displayRig");
let displayPla = document.querySelector(".displayPla");
let displayPau = document.querySelector(".displayPau");

const myAlphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

const alphMp3 = ["./Audio/a.mp3", "./Audio/b.mp3", "./Audio/c.mp3", "./Audio/d.mp3", "./Audio/e.mp3", "./Audio/f.mp3", "./Audio/g.mp3", "./Audio/h.mp3", "./Audio/i.mp3", 
                  "./Audio/j.mp3", "./Audio/k.mp3", "./Audio/l.mp3", "./Audio/m.mp3", "./Audio/n.mp3", "./Audio/o.mp3", "./Audio/p.mp3", "./Audio/q.mp3", "./Audio/r.mp3",
                  "./Audio/s.mp3", "./Audio/t.mp3", "./Audio/u.mp3", "./Audio/v.mp3", "./Audio/w.mp3", "./Audio/x.mp3", "./Audio/y.mp3", "./Audio/z.mp3"];

let currentAlp = 0;
let currentMp3 = 0;
let mistakes = 0;
let rightKeys = 0;
let score = 0;

let gameActive = true;
// =============================================================================================
// for stopWatch
let startTime;
let intervalId;
let running = false;

function updateDisplay() {
  const currentTime = new Date().getTime() - startTime;
  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const milliseconds = currentTime % 1000;
  stopwatch.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}
function startWatch() {
  if (!gameActive) return;
  if (!running) {
    startTime = new Date().getTime();
    intervalId = setInterval(updateDisplay, 10);
    running = true; // Set running to true
  }
}
function stopWatch(){
  clearInterval(intervalId);
  running = false;
}

function watchReset() {
  stopWatch();
  stopwatch.textContent = '00:00:00';
}



// =============================================================================================
// Just show alphabet by setInterval
function displayAlphabetOneByOne() {
  choseGame.style.display = "none";
  displayPla.style.display = "block";
  displayPau.style.display = "block";
  displayScore.style.display = "none";
  displayMis.style.display = "none";
  displayRig.style.display = "none";

  let currentIndex = 0;

  const interval = setInterval(() => {
    if (currentIndex < myAlphabet.length) {
      alphabet.textContent = myAlphabet[currentIndex];
      currentIndex++;
      currentMp3++;
      audioPlay();
      // console.log(currentIndex);
      // console.log(currentMp3);
    } else {
      clearInterval(interval); // Stop the interval when all elements have been displayed
      startGame.style.display = "block";
    }
  }, 1000); // 1000 milliseconds = 1 second
}

// =============================================================================================
      // audio play function
      function audioPlay() {
        let audio = new Audio(alphMp3[currentMp3]);
        // console.log(audio);
        audio.play();
      }
      
      // for startGame button
      function playGame(){
        location.reload();
        watchReset();
      }
// =============================================================================================

function handleKeyDown(event) {
  startWatch();
  // for game off
  if (!gameActive) return;
  displayScore.style.display = "block";
  stopwatch.style.display = "block";
  displayMis.style.display = "block";
  displayRig.style.display = "block";
  displayPla.style.display = "none";
  displayPau.style.display = "none";
  const keyPressed = event.key.toUpperCase();
  const currentLetter = myAlphabet[currentAlp];
  // console.log(keyPressed);
  // console.log(currentLetter);
  
  if (keyPressed === currentLetter) {
    rightKeys++;
    score += 10;
  } else {
    mistakes++;
    score -= 5;
    alertBox.style.display = "block";
  }

  currentAlp++;
  currentMp3++
  audioPlay();
  // console.log(currentAlp);
  // console.log(currentMp3);

  if (currentAlp >= myAlphabet.length) {
    
    stopWatch();
    gameOver.style.display = "block";
    startGame.style.display = "block";
    gameActive = false;
  }

  // Hide the alert box after a certain time (e.g., 2 seconds)
  setTimeout(() => {
      alertBox.style.display = "none";
  }, 1000);

  alphabet.textContent = myAlphabet[currentAlp];
  mistakeElement.textContent = mistakes;
  rightKeyElement.textContent = rightKeys;
  scoreElement.textContent = score;
}
// =============================================================================================
// for random alphabet
let showRanAlph = Math.floor(Math.random() * myAlphabet.length);
function randomAlph(e){ 
  startWatch();
  // for game off
  if (!gameActive) return;
  displayScore.style.display = "block";
  stopwatch.style.display = "block";
  displayMis.style.display = "block";
  displayRig.style.display = "block";
  displayPla.style.display = "none";
  displayPau.style.display = "none";
  choseGame.style.display = "none";

  const keyPress = e.key.toUpperCase();
  // console.log(keyPress);
  const currentDisAlph = myAlphabet[showRanAlph];
  // console.log(currentDisAlph);
  if (currentDisAlph === keyPress ) {
    rightKeys++;
    score += 10;
    showRanAlph = Math.floor(Math.random() * myAlphabet.length);
  } else {
    mistakes++;
    score -= 5;
    alertBox.style.display = "block";
    showRanAlph = Math.floor(Math.random() * myAlphabet.length);
  }

  // if (currentAlp >= myAlphabet.length) {
  //   gameOver.style.display = "block"
  //   startGame.style.display = "block"
  //   gameActive = false;
  //   // currentAlp = 0;
  // }

  // Hide the alert box after a certain time (e.g., 2 seconds)
  setTimeout(() => {
      alertBox.style.display = "none";
  }, 1000);

  alphabet.textContent = myAlphabet[showRanAlph];
  mistakeElement.textContent = mistakes;
  rightKeyElement.textContent = rightKeys;
  scoreElement.textContent = score;
}
// =============================================================================================

// for show alphabet
function showAlph(){
  displayAlphabetOneByOne();
}
// Manu play game
function ManuPlayGame() {
  window.addEventListener('keydown', handleKeyDown);
}
// =============================================================================================
alphShow.addEventListener('click', () => {
  showAlph();
  dropdownMenuButton.disabled = true;
  dropdownMenu.style.display = "none";
});

manuPlaGame.addEventListener('click', () =>{
    choseGame.style.display = "none";
    alphabet.textContent = myAlphabet[0];
    ManuPlayGame();
    dropdownMenuButton.disabled = true;
    dropdownMenu.style.display = "none";
});


RandomAlphShow.addEventListener('click', () => {
  // Attach the keydown event listener to the window
  choseGame.style.display = "none";
  alphabet.textContent = myAlphabet[showRanAlph];
  window.addEventListener('keydown', randomAlph);
  dropdownMenuButton.disabled = true;
  dropdownMenu.style.display = "none";
});


startGame.addEventListener('click', playGame);
// =============================================================================================


