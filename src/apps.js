const appMenu = document.querySelector(".appMenu");
const appPanel = document.querySelector(".app");
const notepadTextEl = document.getElementById("notepadText");
const notepadHeadingEl = document.getElementById("notepadHeading");
const taskInput = document.getElementById("taskinput");

const appState = {
  opened: true,
  name: "taskapp",
};

const fetchAppCode = async (appName) => {
  try {
    const res = await fetch(`../files/{appName}.txt`);
    const text = await res.text();
    localStorage.setItem(appName, text);
    return text;
  } catch (e) {}
};

if (!localStorage.getItem("notebuttons")) fetchNotebuttions("notebuttions");

const openApps = (appName) => {
  let appCode = localStorage.getItem(appName);
  if (appState.opened && appState.name == appName) {
    closeApps();
    appopend.opened = false;
  } else {
    if (appCode) {
      appPanel.innerHTML = appCode;
      console.log("from local");
    } else {
      fetchAppCode(appName).then((appCode) => {
        appPanel.innerHTML = appCode;
      });
    }
    appState.opened = true;
    appState.name = appName;
    updateList(appName);
  }
};

const saveNote = () => {
  const notebody = notepadTextEl.value;
  const heading = notepadHeadingEl.value;
  !localStorage.getItem("notes") && localStorage.setItem("notes", "{}");
  const notes = JSON.parse(localStorage.getItem("notes"));
  const noteid = generateUid();

  notes[noteid] = {
    heading,
    notebody,
    noteid,
  };

  localStorage.setItem("notes", JSON.stringify(notes));

  updateList("notesapp");
};

const saveTask = () => {
  const tasktext = taskInput.value;
  const taskid = generateUid();
  !localStorage.getItem("tasks") && localStorage.setItem("tasks", "{}");
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks[taskid] = {
    tasktext,
    status: 0,
    taskid,
  };

  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateList("taskapp");
};

const updateList = (appName) => {
  if (appName == "notesapp") {
    !localStorage.getItem("notes") && localStorage.setItem("notes", "{}");

    const notes = JSON.parse(localStorage.getItem("notes"));
    const notesList = document.createElement("div");
    notesList.classList.add("notesList");

    for (const note of notes) {
      notesList.innerHTML += `<div class="note" onclick="openFile(this.getAttribute('noteid'), this.className)" noteid="${note.noteid}">
    <h3>${note.heading}</h3>
    <span><ion-icon name="trash-outline"></ion-icon></span>
</div>`;
    }
    appMenu.innerHTML = "";
    appMenu.appendChild(notesList);
  } else if (appName == "taskapp") {
    !localStorage.getItem("tasks") && localStorage.setItem("tasks", "{}");

    const tasks = JSON.parse(localStorage.getItem("tasks"));
    taskList.innerHTML = "";
    const taskList = document.createElement("div");
    taskList.classList.add("taskList");
    for (const task of tasks) {
      const icon = task.status == 0 ? "square-outline" : "checkbox-outline";
      const doneclass = task.status == 0 ? "" : "done";
      taskList.innerHTML += `<div class="task ${doneclass}">
    <h3>${task.tasktext}</h3>
    <span><ion-icon onclick="updateTaskStatus(this.id)" id="${task.taskid}" name="${icon}"></ion-icon></span>
</div>`;
    }
    appMenu.innerHTML = "";
    appMenu.appendChild(taskList);
  }
};

const openFile = (uid) => {
  const allFiles = JSON.parse(localStorage.getItem("notes"));
  for (const file in allFiles) {
    if (file.noteid == uid) {
      const fileDiv = document.createElement("div");
      fileDiv.classList.add("fileopener");
      const heading = document.createElement("h3");
      const para = document.createElement("p");
      const notebuttons = localStorage.getItem("notebuttons");
      para.innerHTML = makeHTML(allFiles[key].notebody);
      heading.innerText = allFiles[key].heading;
      fileDiv.appendChild(heading);
      fileDiv.appendChild(para);
      fileDiv.innerHTML += notebuttons;
      appMenu.innerHTML = "";
      appMenu.appendChild(fileDiv);
    }
  }
};

const makeHTML = (text) => {
  const strongRegex = /\*([^\*]+)\*/g;
  const emRegex = /_([^_]+)_/g;

  const html = text
    .replace(strongRegex, "<strong>$1</strong>")
    .replace(emRegex, "<em>$1</em>");
  return html;
};

function updateTaskStatus(uid) {
  const allTasks = JSON.parse(localStorage.getItem("Tasks"));

  allTasks[uid]["taskstatus"] = 1;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  updateList("taskapp");
}

const closeApps = () => (appPanel.innerHTML = "");

const generateUid = () =>
  String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    "",
  );
