class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}
