class task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
}

class project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}
