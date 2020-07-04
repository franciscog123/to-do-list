import './styles.css';
import { format } from 'date-fns';
import Task from './modules/task.js';
import List from './modules/list.js';
import {
  setInlineCssListener, setOpenMenuListener,
  setMenuCloseListener, setCollapsibleContent, setModalListeners,
} from './modules/display.js';

const task1 = new Task('Task1', 'Description fkf', format(new Date(2001, 1, 3), 'yyyy-MM-dd'), 1, 'no notes');
const task2 = new Task('Task2', 'Description dddd', format(new Date(2020, 3, 5), 'yyyy-MM-dd'), 1, 'still no notes');
const task3 = new Task('Task3', 'Description 333', format(new Date(2020, 6, 10), 'yyyy-MM-dd'), 2, 'no notes');
const ray = [task1, task2];

const list1 = new List('List1', ray);
console.log(list1);

list1.addTask(task3);
console.log(list1);

list1.removeTask(1);
console.log(list1);

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

setMenuCloseListener();
setOpenMenuListener();
setCollapsibleContent();
setInlineCssListener();
