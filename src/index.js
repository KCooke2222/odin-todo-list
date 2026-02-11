import app from "./app.js";
import "./styles.css";
const board = document.querySelector(".board");
const store = app();

// btns
board.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;

  const action = el.dataset.action;

  const projectEl = el.closest(".project");
  const taskEl = el.closest(".task");

  const projectIdx = projectEl ? Number(projectEl.dataset.projectIdx) : null;
  const taskIdx = taskEl ? Number(taskEl.dataset.taskIdx) : null;

  switch (action) {
    case "add-task":
      const task = { title: "" };
      store.addTask(projectIdx, task);
      renderBoard();
      break;

    case "del-task":
      store.delTask(projectIdx, taskIdx);
      renderBoard();
      break;

    case "del-project":
      store.delProject(projectIdx);
      renderBoard();
      break;

    case "add-project":
      store.addProject({ name: "New Project" });
      renderBoard();
      break;
  }
});

// editable text
board.addEventListener("click", (e) => {
  const fieldEl = e.target.closest('[data-action="edit-field"]');
  if (!fieldEl) return;

  fieldEl.contentEditable = "true";
  fieldEl.focus();

  if (!fieldEl.isConnected) return;

  // put cursor at end
  const r = document.createRange();
  r.selectNodeContents(fieldEl);
  r.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(r);
});

board.addEventListener("keydown", (e) => {
  const fieldEl = e.target.closest('[data-action="edit-field"]');
  if (!fieldEl) return;

  if (e.key === "Enter") {
    e.preventDefault();
    fieldEl.blur(); // triggers save below
  }
});

board.addEventListener("focusout", (e) => {
  const fieldEl = e.target.closest('[data-action="edit-field"]');
  if (!fieldEl) return;

  fieldEl.contentEditable = "false";

  const taskEl = fieldEl.closest(".task");
  const projectEl = fieldEl.closest(".project");

  const projectIdx = Number(projectEl.dataset.projectIdx);
  const taskIdx = taskEl ? Number(taskEl.dataset.taskIdx) : null;

  const field = fieldEl.dataset.field; // "title" or "description" or "name"
  const value = fieldEl.textContent.trim();

  const updates = { [field]: value };

  if (field === "name") {
    store.updateProject(projectIdx, updates);
  } else {
    store.updateTask(projectIdx, taskIdx, updates);
  }

  renderBoard();
});

// toggle
board.addEventListener("change", (e) => {
  const el = e.target.closest('input[type="checkbox"]');
  if (!el) return;

  const action = el.dataset.action;

  const projectEl = el.closest(".project");
  const taskEl = el.closest(".task");

  const projectIdx = projectEl ? Number(projectEl.dataset.projectIdx) : null;
  const taskIdx = taskEl ? Number(taskEl.dataset.taskIdx) : null;
  console.log(projectIdx, taskIdx, el.checked);

  if (action === "edit-field") return;

  switch (action) {
    case "complete-task":
      store.updateTask(projectIdx, taskIdx, { completed: el.checked });
      break;
  }

  renderBoard();
});

function loadTask(task, idx, projectDiv) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.dataset.taskIdx = idx;

  // completeDiv + checkbox
  const completeDiv = document.createElement("div");
  completeDiv.className = "task-complete";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.dataset.action = "complete-task";

  completeDiv.appendChild(checkbox);

  // infoDiv + title + desc
  const infoDiv = document.createElement("div");
  infoDiv.className = "task-info";

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = task.title;
  title.dataset.field = "title";
  title.dataset.action = "edit-field";

  const desc = document.createElement("div");
  desc.className = "task-desc";
  desc.textContent = task.description ?? "";
  desc.dataset.field = "description";
  desc.dataset.action = "edit-field";

  infoDiv.append(title, desc);

  // del div
  const delDiv = document.createElement("div");
  delDiv.className = "task-del";

  const delBtn = document.createElement("button");
  delBtn.innerText = "🗑";
  delBtn.dataset.action = "del-task";
  delDiv.appendChild(delBtn);

  // assemble task
  taskDiv.append(completeDiv, infoDiv, delDiv);
  projectDiv.appendChild(taskDiv);
}

function loadProject(proj, idx) {
  const projDiv = document.createElement("div");
  projDiv.className = "project";
  projDiv.dataset.projectIdx = idx;

  // HEADER WRAPPER
  const headerDiv = document.createElement("div");
  headerDiv.className = "project-header";

  const projName = document.createElement("p");
  projName.innerText = proj.name;
  projName.dataset.field = "name";
  projName.dataset.action = "edit-field";

  const delDiv = document.createElement("div");
  delDiv.className = "project-del";

  const delBtn = document.createElement("button");
  delBtn.innerText = "🗑";
  delBtn.dataset.action = "del-project";

  delDiv.appendChild(delBtn);

  headerDiv.append(projName, delDiv); // ← key change
  projDiv.appendChild(headerDiv);

  // Add task button
  const addBtn = document.createElement("button");
  addBtn.innerText = "Add task";
  addBtn.dataset.action = "add-task";
  projDiv.appendChild(addBtn);

  const tasksDiv = document.createElement("div");
  tasksDiv.className = "taskList";
  projDiv.appendChild(tasksDiv);

  board.appendChild(projDiv);

  proj.tasks.forEach((task, idx) => {
    loadTask(task, idx, projDiv);
  });
}

function renderBoard() {
  const projects = store.projects;

  board.innerText = "";

  // div
  const controlsDiv = document.createElement("div");
  controlsDiv.className = "board-controls";

  // add proj btn
  const addProjBtn = document.createElement("button");
  addProjBtn.innerText = "Add project";
  addProjBtn.dataset.action = "add-project";

  controlsDiv.appendChild(addProjBtn);
  board.appendChild(controlsDiv);

  projects.forEach((proj, idx) => {
    loadProject(proj, idx);
  });
}

renderBoard();
