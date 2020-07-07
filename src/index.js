import './styles.css';
import { format } from 'date-fns';
import PubSub from 'pubsub-js';
import myImage from './assets/GitHub-Mark-Light-32px.png';
import 'core-js';
import Task from './modules/task.js';
import List from './modules/list.js';
import {
  setInlineCssListener, setOpenMenuListener, submitNewList, renderTasks,
  setMenuCloseListener, setCollapsibleContent, setModalListeners, renderListButtons,
} from './modules/display.js';

const task1 = new Task('Task1', 'Description fkf', format(new Date(2001, 1, 3), 'yyyy-MM-dd'), 1, 'no notes');
const task2 = new Task('Task2', 'Description dddd', format(new Date(2020, 3, 5), 'yyyy-MM-dd'), 1, 'still no notes');
const task3 = new Task('Task3', 'Description 333', format(new Date(2020, 6, 10), 'yyyy-MM-dd'), 2, 'no notes');
const ray = [task1, task2];

const list1 = new List('Test1', ray);
const list2 = new List('Test2');

list1.addTask(task3);
list1.removeTask(1);

const allLists = [list1, list2];

// render all Lists to DOM from allLists array
renderListButtons(allLists, allLists.length);

// create a function to subscribe to topics
// adds a new list object to AllLists array
const myListSubscriber = (msg, data) => {
  console.log(msg);
  allLists.push(new List(data));
};

// add function to list of subscribers for particular topic
// When 'Update List Object' topic is fired, our subscriber function is called
PubSub.subscribe('Update List Object', myListSubscriber);

// Global variable for testing. REMOVE LATER
window.allLists = allLists;

renderTasks(list1.tasks);

// create a function to subscribe to topics
// render tasks for specific list when list button clicked
const myTaskButtonSubscriber = (msg, data) => {
  console.log(msg);
  renderTasks(allLists[data].tasks);
};

// add function to list of subscribers for particular topic
// When 'Render Tasks' topic is fired, our subscriber function is called
PubSub.subscribe('Render Tasks', myTaskButtonSubscriber);

// set event listener for new list button
document.querySelector('#newListBtn').addEventListener('click', () => {
  submitNewList(allLists.length);
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
setCollapsibleContent();
setInlineCssListener();
