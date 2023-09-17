import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css"

// div timer, stylization
const divTimer = document.querySelector(".timer");
divTimer.style.marginTop = "15px";
divTimer.style.display = "flex";

// all divs fields, stylization
const divFields = document.querySelectorAll(".field");
divFields.forEach(item => {
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.alignItems="center"
    item.style.width = "60px";
})

// all spans label, stylization
const spanLabels = document.querySelectorAll(".label");
spanLabels.forEach(item => {
    item.style.fontSize = "12px";
    item.style.fontWeight = "700";
    item.style.textTransform = "uppercase";
})

// output for countdown, stylization
const dataDays = document.querySelector(".value[data-days]");
const dataHours = document.querySelector(".value[data-hours]");
const dataMinutes = document.querySelector(".value[data-minutes]");
const dataSeconds = document.querySelector(".value[data-seconds]");

dataDays.style.fontSize = "25px";
dataDays.style.fontWeight = "400";

dataHours.style.fontSize = "25px";
dataHours.style.fontWeight = "400";

dataMinutes.style.fontSize = "25px";
dataMinutes.style.fontWeight = "400";

dataSeconds.style.fontSize = "25px";
dataSeconds.style.fontWeight = "400";

let currentDate = new Date(); // current date and time
let futureDate = currentDate; // date and time in future

let leftMs = 0; // count of milliseconds of the countdown
let leftDHMS = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
} // days-hours-minutes-seconds countdown
updateDHMS(leftDHMS);

let timerId = null; // ID for interval

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        currentDate = new Date();
        futureDate = currentDate

        if (timerId) clearInterval(timerId);

        leftDHMS.days = 0;
        leftDHMS.hours = 0;
        leftDHMS.minutes = 0;
        leftDHMS.seconds = 0;
        updateDHMS(leftDHMS);

        if (selectedDates[0] > currentDate) {
            btnStart.removeAttribute("disabled");
            futureDate = selectedDates[0];    
        } else {
            btnStart.setAttribute("disabled", "");
            Notiflix.Notify.failure('Please choose a date in the future');
        }
  },
}; // optional parameters and actions when closing flatpickr

const txtInputDate = document.querySelector("#datetime-picker"); // input field
const fp = flatpickr(txtInputDate, options); // init flatpickr 

const btnStart = document.querySelector("button[data-start"); // button Start
btnStart.setAttribute("disabled", ""); // deactivation of the button when the page is loaded

btnStart.addEventListener("click", handlerBtnStartClick); // listener on button Start for click

function handlerBtnStartClick() {
    btnStart.setAttribute("disabled", "");

    currentDate = new Date();
    leftMs = futureDate - currentDate;

    if (leftMs < 1000) return;

    leftDHMS = convertMs(leftMs);
    updateDHMS(leftDHMS);

    timerId = setInterval(() => {
        leftMs = leftMs - 1000;
        
        if (leftMs < 1000) {
            leftDHMS.seconds = 0;
            updateDHMS(leftDHMS);
            clearInterval(timerId);
        } else {
            if (leftDHMS.seconds === 0) {
                leftDHMS = convertMs(leftMs);
            } else {
                leftDHMS.seconds = leftDHMS.seconds - 1;
            }
            updateDHMS(leftDHMS);
        }
    }, 1000)
}

// convert ms to day-hour-minute-second
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// update output for countdown
function updateDHMS(DHMS) {
    dataDays.textContent = String(DHMS.days).length<2 ? "0"+DHMS.days : +DHMS.days;
    dataHours.textContent = String(DHMS.hours).length<2 ? "0"+DHMS.hours : +DHMS.hours;
    dataMinutes.textContent = String(DHMS.minutes).length<2 ? "0"+DHMS.minutes : +DHMS.minutes;
    dataSeconds.textContent = String(DHMS.seconds).length<2 ? "0"+DHMS.seconds : +DHMS.seconds;
}

