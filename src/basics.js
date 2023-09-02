const q = document.getElementById("query");
const google = "https://www.google.com/search?q=";
const f = document.getElementById("form");

alert("This website is under devlopment some features may not work.");

//for google search
function submitted(event) {
  event.preventDefault();
  const url = google + "+" + q.value;
  window.open(url, "_self");
  win.focus();
}

f.addEventListener("submit", submitted);
