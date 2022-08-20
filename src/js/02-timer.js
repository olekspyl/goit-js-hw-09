// Described in documentation
import flatpickr from 'flatpickr';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';
// notifications
import Notiflix from 'notiflix';

const refs = {
  calendarInput: document.querySelector('#datetime-picker'),
  buttonEl: document.querySelector('button[data-start]'),
  spanDaysEl: document.querySelector('[data-days]'),
  spanHoursEl: document.querySelector('[data-hours]'),
  spanMinutesEl: document.querySelector('[data-minutes]'),
  spanSecondsEl: document.querySelector('[data-seconds]'),
};

refs.buttonEl.addEventListener('click', () => {
  timer.start();

});

let deltaTime;

// default settings for the button - disabled
refs.buttonEl.disabled = true;
let timer;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates) {
      // startTime is the time at this moment user is choosing the time
      const startTime = Date.now();
      // selectedTime is the time that was selected by the user and getTime() method returns a numeric representation of the date (timestamp) – the number of milliseconds
      let selectedTime = selectedDates[0].getTime();
      // difference between the selected time and current time in milliseconds
      deltaTime = selectedTime - startTime;

      // if selectedTime < OR === to startTime then show alert window
      if (selectedTime <= startTime) {
        Notiflix.Notify.failure('Please choose a date in the future');
      } else {
        // if selectedTime > than startTime make a Start button enabled
        refs.buttonEl.disabled = false;
      }
    }
  },
};

// timer object
timer = {
  IntervalId: null,

  start() {
    refs.buttonEl.disabled = true;
    refs.calendarInput.disabled = true;
    // if there are more than one IntervalId clear it and leave it the last one
    if (this.IntervalId) {
      clearInterval(this.IntervalId);
    }
    // setting Interval for IntervalId
    this.IntervalId = setInterval(() => {
      // converting deltaTime from milliseconds into seconds
      deltaTime -= 1000;
      // if deltaTime becomes less than 1 clear the Interval and return NULL
      if (deltaTime <= 1) {
        clearInterval(this.IntervalId);
        return null;
      }
      // passing deltaTime to the function that returns an object with the calculated time remaining until the end date
      const time = convertMs(deltaTime);
      // calling the function that updates values of the clock and passing converted time remaining until the end date
      updateClock(time);
      // changing the Start button status to disabled after the time was selected
    }, 1000);
  },
};

// function that updates values of the clock
function updateClock({ days, hours, minutes, seconds }) {
  refs.spanDaysEl.textContent = `${days}`;
  refs.spanHoursEl.textContent = `${hours}`;
  refs.spanMinutesEl.textContent = `${minutes}`;
  refs.spanSecondsEl.textContent = `${seconds}`;
}

/* function that takes a number, casts to a string, and adds 0 to the 
beginning if the number is less than 2 characters */
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// passing input id and options to the flatpickr
flatpickr('#datetime-picker', options);

// function returns an object with the calculated time remaining until the end date
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}