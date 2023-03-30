const RAMDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");
const startbtn = document.getElementById("startbtn");
const stopbtn = document.getElementById("stopbtn");
const pTag = document.getElementById("pTag");

const typeSound = new Audio("./audio/typing-sound.mp3");
const wrongSound = new Audio("./audio/wrong.mp3");
const correctSound = new Audio("./audio/correct.mp3");

// Start a typing game by press a start button
startbtn.addEventListener("click", RenderNextSentence);
// Stop a typing game by press a start button
stopbtn.addEventListener("click", reload);

/* Judge if input letter is correct or not */
typeInput.addEventListener("input", () => {
  /* Adding typing sound */
  typeSound.play();
  typeSound.currentTime = 0;

  const sentenceArray = typeDisplay.querySelectorAll("span");
  // console.log(sentenceArray);
  const arrayValue = typeInput.value.split("");
  // console.log(arrayValue);
  let correct = true;
  sentenceArray.forEach((characterSpan, index) => {
    if (arrayValue[index] == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (characterSpan.innerText === arrayValue[index]) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");

      wrongSound.volume = 0.1;
      wrongSound.play();
      currentTime = 0;
      correct = false;
    }
  });

  if (correct == true) {
    correctSound.play();
    correctSound.currentTime = 0;
    RenderNextSentence();
  }
});

/* Get random sentences with async */
function GetRandomSentence() {
  return fetch(RAMDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

/* Display sentences picked up randomly */
async function RenderNextSentence() {
  const sentence = await GetRandomSentence();
  // console.log(sentence);

  typeDisplay.innerText = "";

  /* Split a sentence into each letter and put each letter in a span tag */
  let oneText = sentence.split("");

  // console.log(oneText);

  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    // console.log(characterSpan);
    typeDisplay.appendChild(characterSpan);
    // characterSpan.classList.add("correct");
  });

  /* Delete a value of textarea */
  typeInput.value = "";

  StartTimer();
  typeInput.focus();
  if (!pTag.classList.contains("invisible")) {
    pTag.classList.add("invisible");
  }
}

let startTime;
let originTime = 30;

function StartTimer() {
  timer.innerText = "Remaining Time: 30";
  startTime = new Date();
  // console.log(startTime);
  setInterval(() => {
    const remainingTime = originTime - getTimerTime();
    timer.innerText = `Remaining Time: ${remainingTime}`;
    if (remainingTime <= 0) TimeUp();
  }, 1000);

  function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
  }

  function TimeUp() {
    RenderNextSentence();
  }
}

// Reloads the current page
function reload() {
  location.reload();
}
