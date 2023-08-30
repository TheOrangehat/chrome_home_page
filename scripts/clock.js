function get_time() {
  let now = new Date();

  let hour = now.getHours();
  let minute = now.getMinutes();

  if (minute < 10) {
    minute = "0" + minute;
  }

  return hour + ":" + minute;
}

try {
  let interval = setInterval(function () {
    let time = get_time();

    document.getElementById("time").innerHTML = time;
  }, 600);
} catch (e) {
  console.log(e);
}

function getDay() {
  let now = new Date();

  let day = now.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

let day = getDay();
document.getElementById("day").innerHTML = day;
