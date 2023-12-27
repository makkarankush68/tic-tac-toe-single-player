const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const newGameBtnNew = document.querySelector(".btnNew");

let currentPlayer;
let gameGrid;
const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let gameTurnCount = 0;
let toggle = 0;
let gameFinish = false;
let compPlay = true;
// function to initialize the game
function initGame() {
  currentPlayer = "X";
  // empty game logic grid
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // empty ui grid
  boxes.forEach((box, index) => {
    box.innerText = "";
    //make boxes reactive to click
    boxes[index].style.pointerEvents = "all";
    //   make boxes transparent
    // boxes[index].classList.remove("win");
    boxes[index].classList = `box box${index+1}`;
  });
  newGameBtn.classList.remove("active");
  newGameBtnNew.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
  gameTurnCount = 0;
  toggle = 0;
  gameFinish = false;
}
initGame();
newGameBtn.addEventListener("click",()=>{
  compPlay = true;
  initGame();
});
newGameBtnNew.addEventListener("click",()=>{
  compPlay = false;
  initGame();
});

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // debug
    console.log('handled click');
    console.log(boxes);
    //remove pointer events from all
    if(compPlay){
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
    }
    //swap turn
    swapTurn();
    // check game over
    checkGameOver();
    console.log(compPlay);
    if(compPlay){
      // computer turn
      checkGameOver();
      setTimeout(() => {
        compTurn();
      }, 400);
      // check if game over
      setTimeout(() => {
        checkGameOver();
        boxes.forEach((box) => {
          if(gameFinish === false ){
            box.style.pointerEvents = "all";
          }
        });
      }, 610);
    }
      if(!compPlay){
        boxes.forEach((box) => {
          box.style.pointerEvents = "all";
        });
      }
  }
}
function swapTurn() {
  if (currentPlayer === "X") currentPlayer = "O";
  else currentPlayer = "X";
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  answer = "";
      //remove pointer events from all
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
  winningPosition.forEach((position) => {
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[1]] !== "" &&
      gameGrid[position[2]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      gameFinish = true;
      // check who win
      if (currentPlayer === "X") answer = "O";
      else answer = "X";

      //remove pointer events from all
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //   make boxes green
      for (let i = 0; i <= 2; i++) {
        boxes[position[i]].classList.add("win");
      }
    }
  });

  //now after if someone wins
  if (answer !== "") {
    gameInfo.innerText = `Winner - ${answer}`;
    newGameBtn.classList.add("active");
    newGameBtnNew.classList.add("active");
    toggle = 1;
    return;
  }

  //if game tied
  let fillcount = 0;
  gameGrid.forEach((key) => {
    if (key !== "") fillcount++;
  });
  if (fillcount === 9) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
    newGameBtnNew.classList.add("active");
  }
}

// new additions - V/S computer
function compTurn() {
setTimeout(() => {
  

  if (toggle == 0) {
    toggle = 1;
    let turnTaken = false;
    gameTurnCount = gameTurnCount+2;
    console.log("game turn count is");
    console.log(gameTurnCount);
    let dareDone = false;
    while (!turnTaken && gameTurnCount<9 && !dareDone) {
      //check if comp can win
      winningPosition.forEach((position) => {
        if (
          (
          (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "") ||
          (gameGrid[position[0]] !== "" && gameGrid[position[2]] !== "") ||
          (gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") 
          ) && (
          (gameGrid[position[0]] === gameGrid[position[1]]) ||
          (gameGrid[position[0]] === gameGrid[position[2]]) ||
          (gameGrid[position[1]] === gameGrid[position[2]])
          ) &&(
            !dareDone
          )
        ) {
          //if all filled do nothing
          let allfilled = true;
          if(gameGrid[position[0]] === "" || gameGrid[position[1]] === "" || gameGrid[position[2]] === ""){
            allfilled = false;
          }
          // all not filled
          if(!allfilled){
            // check if comp winnin 
            if(
              (gameGrid[position[0]] === "O" && gameGrid[position[1]] === "O") ||
              (gameGrid[position[0]] === "O" && gameGrid[position[2]] === "O") ||
              (gameGrid[position[1]] === "O" && gameGrid[position[2]] === "O") 
              ){
              console.log("winning comp");
              if(gameGrid[position[0]] === ""){
                handleClick(position[0]);
                turnTaken = true;
              }
              else if(gameGrid[position[1]] === ""){
                handleClick(position[1]);
                turnTaken = true;
              }
              else{
                handleClick(position[2]);
                turnTaken = true;
              }
              dareDone = true;
            }
          }
        }
        });


      // check if he is winning
      // check if 2 are in winning posiiton
      winningPosition.forEach((position) => {
        if (
          (
          (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "") ||
          (gameGrid[position[0]] !== "" && gameGrid[position[2]] !== "") ||
          (gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") 
          ) && (
          (gameGrid[position[0]] === gameGrid[position[1]]) ||
          (gameGrid[position[0]] === gameGrid[position[2]]) ||
          (gameGrid[position[1]] === gameGrid[position[2]])
          ) &&(
            !dareDone
          )
        ) {
          //if all filled do nothing
          let allfilled = true;
          if(gameGrid[position[0]] === "" || gameGrid[position[1]] === "" || gameGrid[position[2]] === ""){
            allfilled = false;
          }
          // all not filled
          if(!allfilled){
              console.log("preventing him win - comp");
  
              if(gameGrid[position[0]] === ""){
                handleClick(position[0]);
                turnTaken = true;
              }
              else if(gameGrid[position[1]] === ""){
                handleClick(position[1]);
                turnTaken = true;
              }
              else{
                handleClick(position[2]);
                turnTaken = true;
              }
  
              //   make boxes red
              for (let i = 0; i <= 2; i++) {
                boxes[position[i]].classList.add("dare");
              }
              setTimeout(() => {
                for (let i = 0; i <= 2; i++) {
                  boxes[position[i]].classList.remove("dare");
                }
              }, 250);
              turnTaken = true;
              // console.log('before return');
              dareDone = true;
              return;
            }
        }
        });

        // no ones winning
        // if dare not done
        // make random choice
        if(!dareDone){
        console.log('making random guess');
        let randIndex = Math.floor(Math.random() * 9);
        console.log(randIndex);
        if (gameGrid[randIndex] === "") {
          handleClick(randIndex);
          turnTaken = true;
        }
      }
    }
  } else {
    toggle = 0;
  }
}, 400);
}