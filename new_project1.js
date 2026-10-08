const words = "the be of and a to in he have it that for they with as not on she at by this we you do but from or which one would all will there say who make go when what so up out about get time look see know take people into year your good some could them other than then now only come over think also back after use two how our work first well way even new want because any these give day most us great small every lead big result keep practice type fast code learn build world life hand part place week point home water room mother area money story fact month lot right study book eye job word business issue side kind head house service friend father power hour game line end member law car city community name team minute idea kid body face others level office door health person art war history party result change morning reason research girl guy moment air teacher force education".split(" ");

const TIME = 90;
const display = document.getElementById("text-display");
const input = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart");

let timeLeft, timer, started, correct;

function makeText(n = 50) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(words[Math.floor(Math.random() * words.length)]);
  return arr.join(" ");
}

function loadText() {
  display.innerHTML = "";
  for (const ch of makeText()) {
    const span = document.createElement("span");
    span.textContent = ch;
    display.appendChild(span);
  }
  display.firstChild.classList.add("current");

  clearInterval(timer);
  timeLeft = TIME;
  started = false;
  correct = 0;
  input.value = "";
  input.disabled = false;
  input.focus();
  timeEl.textContent = TIME;
  wpmEl.textContent = 0;
  accEl.textContent = 100;
  resultEl.textContent = "";
}

function updateWPM() {
  const elapsed = TIME - timeLeft;
  if (elapsed > 0) wpmEl.textContent = Math.round((correct / 5) / (elapsed / 60));
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    updateWPM();
    if (timeLeft <= 0) endTest();
  }, 1000);
}

function endTest() {
  clearInterval(timer);
  input.disabled = true;
  resultEl.textContent = `🎉 ${wpmEl.textContent} WPM with ${accEl.textContent}% accuracy`;
}

input.addEventListener("input", () => {
  if (!started) { started = true; startTimer(); }

  const spans = display.querySelectorAll("span");
  const typed = input.value;
  correct = 0;

  spans.forEach((span, i) => {
    const c = typed[i];
    if (c == null) span.className = "";
    else if (c === span.textContent) { span.className = "correct"; correct++; }
    else span.className = "wrong";
  });

  if (spans[typed.length]) spans[typed.length].classList.add("current");
  accEl.textContent = typed.length ? Math.round((correct / typed.length) * 100) : 100;
  updateWPM();
  if (typed.length >= spans.length) endTest();
});

restartBtn.addEventListener("click", loadText);
loadText();