const q = document.getElementById("query");
const f = document.getElementById("form");

alert("This website is under devlopment some features may not work.");

f.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = `https://www.google.com/search?q=${q.value}`;
  const win = window.open(url, "_self");
  win.focus();
});
