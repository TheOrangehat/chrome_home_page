let appMenu = document.getElementsByClassName("appMenu")[0];
let apppanale = document.getElementsByClassName("app")[0];

let appopend = [true, "taskapp"];

function appopener(appname) {
  let appcode = localStorage.getItem(appname);
  if (appopend[0] && appopend[1] == appname) {
    closeapps();
    appopend = [false, appname];
  } else {
    if (appcode) {
      apppanale.innerHTML = localStorage.getItem(appname);
      console.log("from local");
    } else {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", "../files/" + appname + ".txt");
      xhr.onload = () => {
        if (xhr.status === 200) {
          const text = xhr.responseText;
          console.log(text);
          apppanale.innerHTML = text;
          localStorage.setItem(appname, text);
        }
      };
      xhr.send();
    }
    appopend = [true, appname];
    listupdater(appname);
  }
}

function notesaver() {
  let notepadText = document.getElementById("notepadText").value;
  let heading = document.getElementById("notepadHeading").value;
  if (localStorage.getItem("Notes") == null) {
    localStorage.setItem("Notes", "{}");
  }
  let Notes = JSON.parse(localStorage.getItem("Notes"));
  let rawnote = {};

  rawnote.heading = heading;
  rawnote.notebody = notepadText;
  rawnote.noteid = uid();

  console.log(rawnote);

  Notes[uid()] = rawnote;
  localStorage.setItem("Notes", JSON.stringify(Notes));

  listupdater("notesapp");
}

function tasksaver() {
  let tasktext = document.getElementById("taskinput").value;
  let taskid = uid();
  if (localStorage.getItem("Tasks") == null) {
    localStorage.setItem("Tasks", "{}");
  }
  let Tasks = JSON.parse(localStorage.getItem("Tasks"));
  let rawtask = {};
  rawtask.tasktext = tasktext;
  rawtask.taskstatus = 0;
  rawtask.taskid = taskid;
  Tasks[taskid] = rawtask;
  localStorage.setItem("Tasks", JSON.stringify(Tasks));

  listupdater("taskapp");
}

function listupdater(f) {
  if (f == "notesapp") {
    if (localStorage.getItem("Notes") == null) {
      localStorage.setItem("Notes", "{}");
    }
    let Notes = JSON.parse(localStorage.getItem("Notes"));
    let notesList = document.createElement("div");
    notesList.classList.add("notesList");

    for (let note in Notes) {
      let heading = Notes[note].heading;
      let noteid = Notes[note].noteid;
      console.log(Notes[note]);
      notesList.innerHTML += `<div class="note" onclick="fileopener(this.getAttribute('noteid'), this.className)" noteid="${noteid}">
    <h3>${heading}</h3>
    <span><ion-icon name="trash-outline"></ion-icon></span>
</div>`;
    }
    appMenu.innerHTML = "";
    appMenu.appendChild(notesList);
  } else if (f == "taskapp") {
    if (localStorage.getItem("Tasks") == null) {
      localStorage.setItem("Tasks", "{}");
    }
    let Tasks = JSON.parse(localStorage.getItem("Tasks"));
    // taskList.innerHTML = "";
    let taskList = document.createElement("div");
    taskList.classList.add("taskList");
    for (let task in Tasks) {
      let heading = Tasks[task].tasktext;
      let status = Tasks[task].taskstatus;
      let taskid = Tasks[task].taskid;
      let icon = "square-outline";
      let doneclass = "";
      if (status == 0) {
        icon = "square-outline";
      } else if (status == 1) {
        icon = "checkbox-outline";
        doneclass = "done";
      }
      taskList.innerHTML += `<div class="task ${doneclass}">
    <h3>${heading}</h3>
    <span><ion-icon onclick="taskstatusupdater(this.id)" id="${taskid}" name="${icon}"></ion-icon></span>
</div>`;
    }
    appMenu.innerHTML = "";
    appMenu.appendChild(taskList);
  }
}

function fileopener(uid) {
  let allFiles = JSON.parse(localStorage.getItem("Notes"));
  for (key in allFiles) {
    if (allFiles[key].noteid == uid) {
      let filediv = document.createElement("div");
      filediv.classList.add("fileopener");
      let heading = document.createElement("h3");
      let para = document.createElement("p");
      para.innerHTML = makeHTML(allFiles[key].notebody);
      console.log("para    " + para.innerHTML);
      heading.innerText = allFiles[key].heading;
      filediv.appendChild(heading);
      filediv.appendChild(para);
      appMenu.innerHTML = "";
      appMenu.appendChild(filediv);
    }
  }
}

function makeHTML(text) {
  const strongRegex = /\*([^\*]+)\*/g;
  const emRegex = /_([^_]+)_/g;

  let html = text;
  html = html.replace(strongRegex, "<strong>$1</strong>"); // change all *
  html = html.replace(emRegex, "<em>$1</em>");
  console.log(html);
  return html;
}

function taskstatusupdater(uid) {
  let allTasks = JSON.parse(localStorage.getItem("Tasks"));

  console.log(allTasks[uid]);
  allTasks[uid]["taskstatus"] = 1;
  localStorage.setItem("Tasks", JSON.stringify(allTasks));
  listupdater("taskapp");
}

const closeapps = () => (apppanale.innerHTML = "");

const uid = () =>
  String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );
