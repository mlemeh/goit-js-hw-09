const body = document.querySelector("body");
const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");

let timerId = null;

btnStart.removeAttribute("disabled");
btnStop.setAttribute("disabled", "");

btnStart.addEventListener("click", handlerStart);
btnStop.addEventListener("click", handlerStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function handlerStart() {
    body.style.backgroundColor = `${getRandomHexColor()}`;
    btnStart.setAttribute("disabled", "");
    btnStop.removeAttribute("disabled");

    timerId = setInterval(() => {
        body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
}

function handlerStop() {
    btnStart.removeAttribute("disabled");
    btnStop.setAttribute("disabled", "");

    clearInterval(timerId);
}

