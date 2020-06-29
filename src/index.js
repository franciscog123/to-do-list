import './styles.css';

// eslint-disable-next-line
import { setInlineCssListener, setOpenMenuListener, setMenuCloseListener, setCollapsibleContent, setModalListeners } from './modules/display.js';

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
