import './styles.css';
import { format } from 'date-fns';
import PubSub from 'pubsub-js';
import myImage from './assets/GitHub-Mark-Light-32px.png';
import 'core-js';
import Task from './modules/task.js';
import List from './modules/list.js';
import {
  setInlineCssListener, setOpenMenuListener, submitNewList, renderTasks,
  setMenuCloseListener, setModalListeners, renderListButtons, submitTaskInput,
} from './modules/display.js';

let allLists = [];

// retrieve data from local storage
allLists = JSON.parse(localStorage.getItem('allLists'));

// saves data from allLists array to localStorage as JSON
function saveToStorage() {
  localStorage.setItem('allLists', JSON.stringify(allLists));
}

// adding lists and tasks if there are none in localStorage
if (allLists == null || allLists.length === 0) {
  const task1 = new Task('Sample Task', 'Description of the task goes here.',
    format(new Date(2001, 1, 3), 'yyyy-MM-dd'), 1, 'Adding detailed notes for my task. Click the check mark on the left to remove this completed task.');
  const list1 = new List('Sample List');
  list1.addTask(task1);
  allLists = [list1];
  saveToStorage();
}

/* Remapping allLists array as a new List object. When the array is retrieved from localStorage,
 the prototype is lost since Json.parse only converts a JSON string into a regular javascript
 object. The prototype methods can't be called without this workaround. */
allLists.forEach((item, index, arr) => {
  const listRay = arr;
  listRay[index] = new List(listRay[index].name, listRay[index].tasks);

  // remap tasks array within each list object as a new task object.
  listRay[index].tasks.forEach((item2, index2, arr2) => {
    const newTask = arr2;
    newTask[index2] = new Task(newTask[index2].title, newTask[index2].description,
      newTask[index2].dueDate, newTask[index2].priority, newTask[index2].notes);
  });
});

// render all Lists to DOM from allLists array
renderListButtons(allLists, allLists.length);

// create a function to subscribe to topics
// adds a new list object to AllLists array
const myListSubscriber = (msg, data) => {
  allLists.push(new List(data));
  saveToStorage();
};

// add function to list of subscribers for particular topic
// When 'Update List Object' topic is fired, our subscriber function is called
PubSub.subscribe('Update List Object', myListSubscriber);

// create a function to subscribe to topics
// adds a new Task object to corresponding List array
const myNewTaskSubscriber = (msg, data) => {
  const listIndex = document.querySelector('.active-list-button').dataset.key;
  allLists[listIndex].addTask(data);
  saveToStorage();
};

// add function to list of subscribers for particular topic
// When 'Create New Task' topic is fired, our subscriber function is called
PubSub.subscribe('Create New Task', myNewTaskSubscriber);

// Global variable for testing.
window.allLists = allLists;

// initial render of tasks in UI
renderTasks(allLists[0].tasks, true);

// create a function to subscribe to topics
// render all tasks for specific list when list button clicked
const myTaskButtonSubscriber = (msg, data) => {
  renderTasks(allLists[data].tasks, false);
};

// add function to list of subscribers for particular topic
// When 'Render Tasks' topic is fired, our subscriber function is called
PubSub.subscribe('Render Tasks', myTaskButtonSubscriber);

// create a function to subscribe to topics
// deletes a single task from allLists array
const taskDeleteSubscriber = (msg, data) => {
  const buttonIndex = data[0];
  const listIndex = data[1];
  allLists[listIndex].tasks.splice(buttonIndex, 1);
  renderTasks(allLists[listIndex].tasks, false);
  saveToStorage();
};

// add function to list of subscribers for particular topic
// When 'Delete Task' topic is fired, our subscriber function is called
PubSub.subscribe('Delete Task', taskDeleteSubscriber);

// set event listener for new list button
document.querySelector('#newListBtn').addEventListener('click', () => {
  submitNewList(allLists.length);
});

// set event listener for new task button
document.querySelector('#task-submit-btn').addEventListener('click', () => {
  submitTaskInput();
});

// set listeners for the new list modal (new list popup form)
const listModal = document.getElementById('new-list-modal');
const listOpenBtn = document.querySelector('.new-list-btn');
const listSpan = document.querySelector('#close-list-modal');
setModalListeners(listModal, listOpenBtn, listSpan);

// set listeners for the new task modal (new task popup form)
const taskModal = document.getElementById('new-task-modal');
const taskOpenBtn = document.querySelector('.float-button-container');
const taskSpan = document.querySelector('#close-task-modal');
setModalListeners(taskModal, taskOpenBtn, taskSpan);

// set listeners for responsive UI elements
setMenuCloseListener();
setOpenMenuListener();
setInlineCssListener();
