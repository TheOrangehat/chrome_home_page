let appMenu = document.getElementsByClassName("appMenu")[0];
let appPanale = document.getElementsByClassName("app")[0];
let activeApp = [true, "taskapp"];
let closeappMenuBtn = `<button id="closeappMenuBtn" onclick="appMenu.classList.add('hide');"><ion-icon name="close-outline"></ion-icon></button>`;

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


function appLauncher(appname, fromedit) {
  let appcode = localStorage.getItem(appname);
  console.log(fromedit)
  // if (activeApp[0] && activeApp[1] == appname) {
  //   closeapps();
  //   activeApp = [false, appname];
  // } else {
    if (appcode) {
      let text = localStorage.getItem(appname);
      if (fromedit !== undefined){
        let mtext = makeElement(text, "headingvalue", `value=${fromedit.heading}`, "Notevalue", `${fromedit.notebody}`)
        appPanale.innerHTML = mtext;
        console.log("excet from meme ");

      }
      else{
        appPanale.innerHTML = text;

      }
      console.log("from local");
    } else {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", "files/" + appname + ".txt");
      xhr.onload = () => {
        if (xhr.status === 200) {
          const text = xhr.responseText;
          if (fromedit !== undefined){
            let mtext = makeElement(text, "headingvalue", `value=${fromedit.heading}`, "notevalue", `value=${fromedit.notebody}`)
            appPanale.innerHTML = mtext;
            console.log("excet from meme ");

          }
          else{
            appPanale.innerHTML = text;

          }
          localStorage.setItem(appname, text);
        }
      };
      xhr.send();
    }
    activeApp = [true, appname];
    listUpdater(appname);
  }
// }

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

  document.getElementById("notepadText").value = "";
  document.getElementById("notepadHeading").value = ""
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
    appMenu.innerHTML = `${closeappMenuBtn}`;
    appMenu.classList.remove("hide");
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
    appMenu.innerHTML = `${closeappMenuBtn}`;
    appMenu.classList.remove("hide");
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
      let notebuttons = localStorage.getItem('notebuttons');
      notebuttons = makeElement(notebuttons, "$1", uid, "$1", uid);

      para.innerHTML = makeHTML(allFiles[key].notebody);

      heading.innerText = allFiles[key].heading;
      filediv.appendChild(heading);
      filediv.appendChild(para);
      filediv.innerHTML += notebuttons;
      appMenu.innerHTML = "";
    appMenu.classList.remove("hide");
      appMenu.appendChild(filediv);
    }
  }
}


  /**
 * Replaces values from string.
 * @param {string} elementCode - String in which changes will be made.
 * @param {string} replacements - original value and replce value. {name}, "Shree Ram".
 */


function makeElement(elementCode, ...replacements) {
  if (replacements.length % 2 !== 0) {
    throw new Error("Mismatched number of original and change values");
  }

  let modifiedElementCode = elementCode;

  for (let i = 0; i < replacements.length; i += 2) {
    const originalValue = replacements[i];
    const changeTo = replacements[i + 1];
    modifiedElementCode = modifiedElementCode.replace(originalValue, changeTo);
  }

  return modifiedElementCode;
}

// Example usage:
let originalHTML = '<p>This is a placeholder for {name}.</p>';
let modifiedHTML = makeElement(originalHTML, "{name}", "John", "{age}", "30");

console.log(modifiedHTML);

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

  /**
 * Handle file events.
 * @param {string} fileid - unique ID of file.
 * @param {string} action - action to do with file 'trash' or 'edit'.
 * @param {string} filetype - type of file 'Tasks' or 'Notes'.
 */

function fileHandler(fileid, action, filetype) {
  let allFiles = JSON.parse(localStorage.getItem(filetype));
  var updaterName = (filetype === "Notes") ? "notesapp" : (filetype === "Tasks") ? "taskapp" : "";
 
  if (action == "trash"){
  
    delete allFiles[fileid]; 
    localStorage.setItem(filetype, JSON.stringify(allFiles));

    listUpdater(updaterName);

  }
  if (action == "edit"){
    console.log(allFiles[fileid])
    let fromedit = {
      heading : allFiles[fileid].heading,
      notebody : allFiles[fileid].notebody

    }
    delete allFiles[fileid];
    console.log("dd")
    appLauncher('notesapp', fromedit);
    
  }
}

const closeapps = () => (appPanale.innerHTML = "");

const uid = () =>
  String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    "",
  );
