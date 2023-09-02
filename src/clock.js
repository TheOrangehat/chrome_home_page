const timeEl = document.getElementById("time");
const dayEl = document.getElementById("day");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getTime() {
  const now = new Date();

  const hour = now.getHours();
  const minute = String(now.getMinutes());

  return hour + ":" + (minute.length == 1 ? "0" + minute : minute);
}

setInterval(() => {
  let time = getTime();

  timeEl.textContent = time;
}, 100);

function getDay() {
  const now = new Date();
  const day = now.getDay();

  return days[day];
}

dayEl.textContent = getDay();
