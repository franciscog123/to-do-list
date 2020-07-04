/**
 * Creates a list of tasks. Initialized by a name and optional array of empty tasks.
 */
export default class List {
  constructor(name, tasks = []) {
    this.name = name;
    this.tasks = tasks;

    /**
     * Adds a single task to the list.
     * @param {Task} task A task object that will be added to the list.
     */
    this.addTask = (task) => {
      this.tasks.push(task);
    };

    /**
     * Removes a single task from the list.
     * @param {int} index The index of the task one wishes to remove from the list.
     */
    this.removeTask = (index) => {
      this.tasks.splice(index, 1);
    };

    /**
     * Edits a single task in the list, replacing all previous task properties
     * with the new task passed in.
     * @param {*} index The index of the task to be edited.
     * @param {*} task Replaces all previous task properties with the properties
     * of the new task passed in.
     */
    this.editTask = (index, task) => {
      this.tasks[index].title = task.title;
      this.tasks[index].description = task.description;
      this.tasks[index].dueDate = task.dueDate;
      this.tasks[index].priority = task.priority;
      this.tasks[index].notes = task.notes;
    };
  }
}
