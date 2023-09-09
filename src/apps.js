let appMenu = document.getElementsByClassName("appMenu")[0];
let appPanale = document.getElementsByClassName("app")[0];
let activeApp = [true, "taskapp"];

if (localStorage.getItem("notebuttons") == null) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "files/notebuttons.txt");
  xhr.onload = () => {
    if (xhr.status === 200) {
      const text = xhr.responseText;
      localStorage.setItem("notebuttons", text);
    }
  };
  xhr.send();
  console.log("notesbutoon done");
}

function appLauncher(appname) {
  let appcode = localStorage.getItem(appname);
  if (activeApp[0] && activeApp[1] == appname) {
    closeapps();
    activeApp = [false, appname];
  } else {
    if (appcode) {
      appPanale.innerHTML = localStorage.getItem(appname);
      console.log("from local");
    } else {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", "files/" + appname + ".txt");
      xhr.onload = () => {
        if (xhr.status === 200) {
          const text = xhr.responseText;

          appPanale.innerHTML = text;
          localStorage.setItem(appname, text);
        }
      };
      xhr.send();
    }
    activeApp = [true, appname];
    listUpdater(appname);
  }
}

function saveNote() {
  let notepadText = document.getElementById("notepadText").value;
  let heading = document.getElementById("notepadHeading").value;
  if (localStorage.getItem("Notes") == null) {
    localStorage.setItem("Notes", "{}");
  }
  let Notes = JSON.parse(localStorage.getItem("Notes"));
  let rawnote = {};
  let noteuid = uid();
  rawnote.heading = heading;
  rawnote.notebody = notepadText;
  rawnote.noteid = noteuid;

  console.log(rawnote);

  Notes[noteuid] = rawnote;
  localStorage.setItem("Notes", JSON.stringify(Notes));

  listUpdater("notesapp");
}

function saveTask() {
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

  listUpdater("taskapp");
}

function listUpdater(f) {
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
      console.log("note id is " + noteid);
      notesList.innerHTML += `<div class="note" onclick="fileOpener('${noteid}')" noteid="${noteid}">
    <h3>${heading}</h3>
    <span onclick="fileHandler('${noteid}','trash', 'Notes')"><ion-icon name="trash-outline"></ion-icon></span>
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
      let donefunc = "";
      if (status == 0) {
        icon = "square-outline";
      } else if (status == 1) {
        icon = "checkbox-outline";
        doneclass = "done";
        donefunc =
          "onclick=\"fileHandler(this.getAttribute('taskid'), 'trash', 'Tasks')\"";
      }
      taskList.innerHTML += `<div class="task ${doneclass} " ${donefunc} taskid = ${taskid} >
    <h3>${heading}</h3>
    <span><ion-icon onclick="taskStatusUpdater(this.id)" id="${taskid}" name="${icon}"></ion-icon></span>
</div>`;
    }
    appMenu.innerHTML = "";
    appMenu.appendChild(taskList);
  }
}

function fileOpener(uid) {
  let allFiles = JSON.parse(localStorage.getItem("Notes"));
  for (key in allFiles) {
    if (allFiles[key].noteid == uid) {
      let filediv = document.createElement("div");
      filediv.classList.add("fileopener");
      let heading = document.createElement("h3");
      let para = document.createElement("p");
      let notebuttons = localStorage.getItem("notebuttons");
      para.innerHTML = makeHTML(allFiles[key].notebody);

      heading.innerText = allFiles[key].heading;
      filediv.appendChild(heading);
      filediv.appendChild(para);
      filediv.innerHTML += notebuttons;
      appMenu.innerHTML = "";
      appMenu.appendChild(filediv);
    }
  }
}

function makeHTML(text) {
  const strongRegex = /\*([^\*]+)\*/g;
  return text.replace(strongRegex, "<strong>$1</strong>");
}

function taskStatusUpdater(uid) {
  let allTasks = JSON.parse(localStorage.getItem("Tasks"));

  allTasks[uid]["taskstatus"] = 1;
  localStorage.setItem("Tasks", JSON.stringify(allTasks));
  listUpdater("taskapp");
}

function fileHandler(fileid, action, filetype) {
  let allFiles = JSON.parse(localStorage.getItem(filetype));
  var updaterName =
    filetype === "Notes" ? "notesapp" : filetype === "Tasks" ? "taskapp" : "";

  if (action == "trash") {
    delete allFiles[fileid];
    localStorage.setItem(filetype, JSON.stringify(allFiles));

    listUpdater(updaterName);
  }
}

const closeapps = () => (appPanale.innerHTML = "");

const uid = () =>
  String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    "",
  );
