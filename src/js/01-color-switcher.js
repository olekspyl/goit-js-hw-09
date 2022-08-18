const timer = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
    body: document.querySelector("body"),
};

timer.startBtn.addEventListener("click", onStartBtnClick);
timer.stopBtn.addEventListener("click", onStopBtnClick);

let timerId = null;
function onStartBtnClick() {
    timerId = setInterval(() => {
        timer.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    timer.startBtn.disabled = true;
}

function onStopBtnClick() {
    clearInterval(timerId);
    timer.startBtn.disabled = false;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

