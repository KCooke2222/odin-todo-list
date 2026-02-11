class Task {
  constructor({
    title = "",
    description = "",
    dueDate = null,
    priority = false,
    completed = false,
  } = {}) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}

class Project {
  constructor({ name } = {}) {
    this.name = name;
    this.tasks = [];
  }
}

export { Task, Project };
