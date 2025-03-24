const buttons = document.querySelectorAll(".button");
const reset = document.querySelector(".reset");
const defaultColor = getComputedStyle(document.querySelector(".button")).backgroundColor

// exctracting player1 name from local storage
let player1Name = localStorage.getItem('player_1')
let player2Name = localStorage.getItem('player_2')  

// initially both scores are 0
let player1Score = 0
let player2Score = 0

const playerOne = document.querySelector('.play1')
const playerTwo = document.querySelector('.play2')
playerOne.textContent = player1Name
playerTwo.textContent = player2Name

const playerOneScore = document.querySelector('.score1')
const playerTwoScore = document.querySelector('.score2')
playerOneScore.textContent = player1Score
playerTwoScore.textContent = player2Score

let count = 0;
let gameOver = false;
let rows = 3,cols = 3;
let arr = new Array(rows);

for (let i = 0; i < rows; i++) {
  arr[i] = new Array(cols).fill(5); // Filling each row with default 0 values
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (gameOver) return;
    const buttonPos = e.target.id;
    const row = Math.floor(parseInt(buttonPos) / 10); // calculating row
    const col = parseInt(buttonPos) % 10; // calculating col
    count += 1;
    if (count % 2 == 0) {
      e.target.textContent = "0";
      e.target.setAttribute("disabled", "");
      arr[row][col] = 0;
    } else {
      e.target.textContent = "X";
      e.target.setAttribute("disabled", "");
      arr[row][col] = 1;
    }

    if (count >= 5) {
      checkWinner(count);
    }
  });
});

// ---------------checking if we got winner--------------
function checkWinner(count) {
  // checking rowise  && colwise
  for (let i = 0; i < rows; i++) {
    if (helperCheck(arr[i][0], arr[i][1], arr[i][2])) {
      markBox(i,"row") 
      gameOver = true;
      break;
    }
    if (helperCheck(arr[0][i], arr[1][i], arr[2][i])) {
        markBox(i,"col")
      gameOver = true;
      break;
    }
  }
  // checking diagonals
  if(helperCheck(arr[0][0], arr[1][1], arr[2][2])){
    gameOver = true
    markBox(0,"leftDiag")
  }
  else if(helperCheck(arr[0][2], arr[1][1], arr[2][0])){
    gameOver = true
    markBox(0,"rightDiag")
  } 

  // call function to print name if gameover is true
  if (gameOver) {
    winnerName(count);
  }

  if (count == 9 && !gameOver) {
    const winner = document.querySelector(".winnerBox #winner");
    document.querySelector(".winnerBox #playAgain").style.display = "none";
    winner.innerHTML = "it's Draw!";
    document.querySelector(".buttons-container").classList.add("reduceOpacity");
    document.querySelector(".winnerBox").classList.remove("hidden");
    setTimeout(resetGame, 1500);   // reset game
  }
}
function helperCheck(a, b, c) {
  if (a != 5 && a == b && a == c) return 1;
  else return 0;
}

// ---------------  announcing winner ------------------------
function winnerName(count) {
  let name;
  // reducing opacity of buttons to announce winner
  document.querySelector(".buttons-container").classList.add("reduceOpacity");

  // disabling buttons (prevent further box filling)
  buttons.forEach((button) => {
    button.setAttribute("disabled", "");
  });

  // extracting name of which player wins
  if (count % 2 == 0) {
      name = player2Name;
      player2Score++
      updateScore(count)
   } else {
      name = player1Name;
      player1Score++
      updateScore(count)
  }
  setTimeout(printMessage, 1000, name);
}

// function to win player win message
function printMessage(name) {
  const winner = document.querySelector(".winnerBox #winner");
  winner.innerHTML = name + " wins";
  document.querySelector(".winnerBox").classList.remove("hidden");
}

//----------------- function to colour or mark box ------------------
function markBox(index,str){
    // marking row if wins by row wise
    if(str == "row"){
        for(let i = 0;i<cols;i++){
            let but = document.getElementById(`${index}${i}`)
            but.style.backgroundColor = "green"
        }
    }
    // marking column if wins by col wise
    if(str == "col"){
        for(let i = 0;i<cols;i++){
            let but = document.getElementById(`${i}${index}`)
            but.style.backgroundColor = "green"
        }
    }
    // marking left diagonal if wins by left diagonal
    if(str == "leftDiag"){
        for(let i = 0;i<cols;i++){
            let but = document.getElementById(`${i}${index}`)
            index+=1
            but.style.backgroundColor = "green"
        }
    }
    // marking right diagonal if wins by right diagonal
    if(str == "rightDiag"){
        for(let i = cols-1;i>=0;i--){
            let but = document.getElementById(`${index}${i}`)
            index+=1
            but.style.backgroundColor = "green"
        }
    }
}
// --------------- reset button -----------------------------------------
reset.addEventListener("click",(e)=>{
    resetGame()
    resetScores()
})
// -------------- function to reset game -------------------------------------
function resetGame() {
  count = 0;    // reset count
  gameOver = false;   // reset gameover
  document.querySelector(".winnerBox").classList.add("hidden"); // removing message
  document.querySelector(".winnerBox #playAgain").style.display = "block"; // play agian button display restoring to default

  // restoring buttons colour to its original form
  buttons.forEach((button)=>{
    button.style.backgroundColor = defaultColor
  })

  // removing disabled from button to make all button functional again
  buttons.forEach((button) => {
    button.innerHTML = "";
    button.removeAttribute("disabled");
  });

  // restoring array to basics
  for (let i = 0; i < rows; i++) {
    arr[i].fill(5);
  }

  // reseting opacity of container
  document
  .querySelector(".buttons-container")
  .classList.remove("reduceOpacity");
}

// function scores
function updateScore(count){
    if(count%2 == 0){
        playerTwoScore.textContent = player2Score
    }
    else{ 
        playerOneScore.textContent = player1Score
    }
}

// reset player scores
function resetScores(){
      player1Score = 0
      player2Score = 0
      playerOneScore.textContent = player1Score
      playerTwoScore.textContent = player2Score
}
