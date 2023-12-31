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

const getTime = () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  return hour + ":" + (minute < 10 ? "0" + minute : minute);
};

const getDay = () => {
  const now = new Date();
  const day = now.getDay();

  return days[day];
};

dayEl.innerHTML = getDay();
setInterval(() => {
  timeEl.innerHTML = getTime();
}, 100);
