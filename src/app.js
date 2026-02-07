function app() {
  const projects = [new Project("Tasks")];

  function addTask(projectIdx, taskData) {
    projects[projectIdx].tasks.push(new Task(taskData));
  }

  function delTask(projectIdx, taskIdx) {
    projects[projectIdx].tasks.splice(taskIdx, 1);
  }

  function updateTask(projectIdx, taskIdx, updates) {
    Object.assign(projects[projectIdx].tasks[taskIdx], updates);
  }

  function addProject(projectData) {
    projects.push(new Project(projectData));
  }

  function delProject(projectIdx) {
    projects.splice(projectIdx, 1);
  }

  function updateProject(projectIdx, updates) {
    Object.assign(projects[projectIdx], updates);
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
