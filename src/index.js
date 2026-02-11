import app from "./app.js";
const board = document.querySelector(".board");
const store = app();

function loadTask(task, idx, projectDiv) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.dataset.idx = idx;

  // completeDiv + checkbox
  const completeDiv = document.createElement("div");
  completeDiv.className = "task-complete";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;

  completeDiv.appendChild(checkbox);

  // infoDiv + title + desc
  const infoDiv = document.createElement("div");
  infoDiv.className = "task-info";

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = task.title;

  const desc = document.createElement("div");
  desc.className = "task-desc";
  desc.textContent = task.desc ?? "";

  infoDiv.append(title, desc);

  // assemble task
  taskDiv.append(completeDiv, infoDiv);
  projectDiv.appendChild(taskDiv);
}

function loadProject(proj, idx) {
  // ui
  const projDiv = document.createElement("div");
  projDiv.className = "project";
  projDiv.dataset.idx = idx;

  const projName = document.createElement("p");
  projName.innerText = proj.name;
  projDiv.appendChild(projName);

  board.appendChild(projDiv);

  // tasks
  proj.tasks.forEach((task, idx) => {
    loadTask(task, idx, projDiv);
  });
}

function renderBoard() {
  const projects = store.projects;

  board.innerText = "";

  projects.forEach((proj, idx) => {
    loadProject(proj, idx);
  });
}

renderBoard();
