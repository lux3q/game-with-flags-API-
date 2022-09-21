const countryName = document.querySelector(".country-name");
const flagImg = document.querySelector(".country-flag-img");
const playerScoreEle = document.querySelector(".score-player");
const computerScoreEle = document.querySelector(".score-computer");
const startGameBtn = document.querySelector(".game-start");
const modal = document.querySelector(".modal");
const span = document.querySelector(".close");
const modalContentDiv = document.querySelector(".modal-content-game");
const scoreDiv =  document.querySelector(".score-div");

const url = "https://www.countryflagsapi.com/png/";

let selectedCountry = {};
let counrtyChoices = [];
let displayedCountryCounter = 0;
let playerScore = 0;
let computerScore = 0;
let flagInterval;

const countries = [
  { name: "Afghanistan", a2c: "AF" },
  { name: "Albania", a2c: "AL" },
  { name: "Algeria", a2c: "DZ" },
  { name: "Andorra", a2c: "AD" },
  { name: "Angola", a2c: "AO" },
  { name: "Anguilla", a2c: "AI" },
  { name: "Antarctica", a2c: "AQ" },
  { name: "Argentina", a2c: "AR" },
];

const setupGame = () => {
  modalContentDiv.style.display = "block"
  if (flagInterval) {
    clearInterval(flagInterval);
  }
  const random = Math.floor(Math.random() * countries.length);
  selectedCountry = countries[random];
  countryName.innerHTML = selectedCountry.name;
  console.log(selectedCountry);
  while (counrtyChoices.length < 3) {
    const country = countries[Math.floor(Math.random() * countries.length)];
    if (country.a2c !== selectedCountry.a2c) {
      counrtyChoices.push(country);
    }
  }
  counrtyChoices.splice(
    Math.floor(Math.random() * counrtyChoices.length),
    0,
    selectedCountry
  );
};

const startGame = () => {
  displayScore();
  flagInterval = setInterval(() => {
    displayedCountryCounter =
      (displayedCountryCounter + 1) % counrtyChoices.length;
    flagImg.setAttribute(
      "src",
      url + counrtyChoices[displayedCountryCounter].a2c
    );
  }, 2000);
};

const checkFlag = () => {
  if (counrtyChoices[displayedCountryCounter].a2c === selectedCountry.a2c) {
    playerScore++;
    resetGame();
  } else {
    computerScore++;
    resetGame();
  }
  if (playerScore >= 5) {
    modalContentDiv.style.display = "none"
    stopGame();
    scoreDiv.insertAdjacentHTML("beforeend", 
    `<h2>You Win</h2>
    <button class="game-next">PLAY AGAIN</button>`);
     nextGame();
    }
  if (computerScore >= 5) {
    modalContentDiv.style.display = "none"
    stopGame();
    scoreDiv.insertAdjacentHTML("beforeend", 
    `<h2>Better Luck next time</h2>
    <button class="game-next">PLAY AGAIN</button>`);
    nextGame();
  }
};

const displayScore = () => {
  playerScoreEle.innerHTML = "Player: " + playerScore;
  computerScoreEle.innerHTML = "Computer: " + computerScore;
};

const resetGame = () => {
  selectedCountry = {};
  counrtyChoices = [];
  displayedCountryCounter = 0;
  setupGame();
  startGame();
};

const stopGame = () => {
  if (flagInterval) {
    clearInterval(flagInterval);
  }
  playerScore = 0;
  computerScore = 0;
};

const nextGame = () => {
  const nextGameBtn = document.querySelector(".game-next"); 
  nextGameBtn.addEventListener("click", () => {
    scoreDiv.innerHTML = "";
    setupGame();
    startGame();
  })
}

flagImg.addEventListener("click", checkFlag);


startGameBtn.addEventListener("click", () => {
  modal.style.display = "block";
  setupGame();
  startGame();
});


span.addEventListener("click", () => {
  modal.style.display = "none";
});


window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
