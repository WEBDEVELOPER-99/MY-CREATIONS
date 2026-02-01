console.log("game.js loaded");

let level = 0;
let data;
let score = 0;
let selected = [];

const gameArea = document.getElementById("game-area");
const langEl = document.getElementById("lang");
const challengeEl = document.getElementById("challenge");
const hintEl = document.getElementById("hint");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

// 🔴 SAFETY CHECK
if (!gameArea || !langEl || !challengeEl || !hintEl || !resultEl || !scoreEl) {
  throw new Error("❌ One or more HTML elements are missing. Check IDs.");
}

fetch("/api/levels")
  .then(res => res.json())
  .then(d => {
    data = d;
    loadLevel();
  });

function loadLevel() {
  selected = [];
  gameArea.innerHTML = "";

  if (level >= data.length) {
    langEl.textContent = "🎉 You finished all levels!";
    challengeEl.textContent = "";
    hintEl.textContent = "";
    resultEl.textContent = `Your final score: ${score} ✅`;
    return;
  }

  const current = data[level];
  langEl.textContent = `${current.language} - Level ${current.level}`;
  challengeEl.textContent = current.challenge;
  hintEl.textContent = `💡 Hint: ${current.hint}`;
  resultEl.textContent = "";

  for (let i = 0; i < current.items; i++) {
    const div = document.createElement("div");
    div.classList.add("item");

    if (current.language === "CSS") {
      div.style.backgroundImage = "url('images/plate.png')";
    } else if (current.language === "JavaScript") {
      div.style.backgroundImage = "url('images/programming.png')";
    } else if (current.language === "Python") {
      div.style.backgroundImage = "url('images/coffee.png')";
    }

    div.dataset.index = i;
    div.onclick = () => selectItem(div);
    gameArea.appendChild(div);
  }
}

function selectItem(div) {
  const current = data[level];
  const idx = parseInt(div.dataset.index);

  if (!current.correctIndices.includes(idx)) {
    resultEl.textContent = "❌ Wrong item!";
    return;
  }

  if (selected.includes(idx)) return;

  div.classList.add("correct");
  selected.push(idx);

  if (selected.length === current.correctIndices.length) {
    resultEl.textContent = "✅ Level Complete!";
    score += 10;
    scoreEl.textContent = "Score: " + score;
    level++;
    setTimeout(loadLevel, 1000);
  }
}

const codeInput = document.getElementById("code-input");
const submitBtn = document.getElementById("submit-btn");
submitBtn.onclick = () => {
  const answer = codeInput.value.trim();
  const current = data[level];
}


function checkAnswer() {
  const current = data[level];
  const userAnswer = codeInput.value.trim();

  if (userAnswer === current.answer) {
    resultEl.textContent = "✅ Correct!";
    score += 10;
    scoreEl.textContent = "Score: " + score;
    codeInput.value = "";

    level++;
    setTimeout(loadLevel, 1000);
  } else {
    resultEl.textContent = "❌ Incorrect. Try again!";
  }
}
submitBtn.onclick = checkAnswer;

for (let i = 0; i < current.items.length; i++) {
  const itemData = current.items[i];
  const div = document.createElement("div");

  div.classList.add("item");
  div.dataset.tag = itemData.tag || "";
  div.dataset.class = itemData.class || "";
  div.dataset.id = itemData.id || "";

  if (itemData.class) div.classList.add(itemData.class);
  if (itemData.id) div.id = itemData.id;

  div.textContent = itemData.tag;

  gameArea.appendChild(div);
}
const codeInput = document.getElementById("code-input");
const submitBtn = document.getElementById("submit-btn");

submitBtn.onclick = runSelector;
codeInput.addEventListener("keydown", e => {
  if (e.key === "Enter") runSelector();
});
function runSelector() {
  const selector = codeInput.value.trim();
  const current = data[level];
}