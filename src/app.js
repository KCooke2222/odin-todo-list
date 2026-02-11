import { Task, Project } from "./model.js";

export default function app() {
  const STORAGE_KEY = "projects";
  const projects = [new Project("Tasks")];

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);

    projects.length = 0;
    data.forEach((p) => {
      const proj = new Project(p.name);
      p.tasks.forEach((t) => {
        proj.tasks.push(new Task(t));
      });
      projects.push(proj);
    });
  }

  // load projects
  load();

  function addTask(projectIdx, taskData) {
    projects[projectIdx].tasks.push(new Task(...taskData));
    save();
  }

  function delTask(projectIdx, taskIdx) {
    projects[projectIdx].tasks.splice(taskIdx, 1);
    save();
  }

  function updateTask(projectIdx, taskIdx, updates) {
    Object.assign(projects[projectIdx].tasks[taskIdx], updates);
    save();
  }

  function addProject(projectData) {
    projects.push(new Project(...projectData));
    save();
  }

  function delProject(projectIdx) {
    projects.splice(projectIdx, 1);
    save();
  }

  function updateProject(projectIdx, updates) {
    Object.assign(projects[projectIdx], updates);
    save();
  }

  return {
    addTask,
    delTask,
    updateTask,
    addProject,
    delProject,
    updateProject,
    projects,
  };
}
