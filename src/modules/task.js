/**
 * Creates a single Task object with related properties.
 */
export default class Task {
  constructor(title, description = '', dueDate = '', priority = '', notes = '') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }
}
