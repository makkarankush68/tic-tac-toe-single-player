const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

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
    boxes[index].classList.remove("win");
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

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
    //swap turn
    swapTurn();
    // check if game over
    checkGameOver();
  }
}
function swapTurn() {
  if (currentPlayer === "X") currentPlayer = "O";
  else currentPlayer = "X";
  gameInfo.innerText = `Current Plaeyer - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", initGame);

function checkGameOver() {
  answer = "";

  winningPosition.forEach((position) => {
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[1]] !== "" &&
      gameGrid[position[2]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
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
    return;
  }

  //if game tied
  let fillcount = 0;
  gameGrid.forEach((key)=>{
    if(key !== "")
        fillcount++;
  });
  if(fillcount === 9){
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}