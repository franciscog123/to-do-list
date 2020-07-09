import PubSub from 'pubsub-js';
import 'core-js';
import Task from './task.js';

/**
 * Collapses the next sibling element of the clicked element.
 * @param {*} event The event passed in when element clicked.
 */
function collapse(event) {
  event.target.classList.toggle('active');
  const taskDetails = event.target.nextElementSibling;
  if (taskDetails.style.maxHeight) {
    taskDetails.style.maxHeight = null;
  } else {
    taskDetails.style.maxHeight = `${taskDetails.scrollHeight}px`;
  }
}

/**
 * Sets the listeners on all task items so that they are collapsible when clicked.
 */
function setCollapsibleContent() {
  const taskButtons = Array.from(document.getElementsByClassName('collapsible-task-button'));

  for (let i = 0; i < taskButtons.length; i += 1) {
    taskButtons[i].addEventListener('click', collapse);
  }
}

/**
 * Deletes the parent elelement of the clicked element. Publishes the deleted task as a topic.
 * @param {element} event The event passed in when the element is clicked.
 */
function deleteParent(event) {
  const activeListIndex = document.querySelector('.active-list-button').dataset.key;
  //event.target.parentElement.remove(); below line does same as this. IE 11 workaround
  event.target.parentElement.parentNode.removeChild(event.target.parentElement);
  PubSub.publish('Delete Task', [event.target.dataset.key, activeListIndex]);
}

/**
 * Sets the listeners on all delete buttons to remove the associated tasks containers.
 * Publishes topic 'Delete Task' to app logic.
 */
function setDeleteTaskListeners() {
  const deleteButtons = Array.from(document.getElementsByClassName('material-icons'));

  if (deleteButtons) {
    // const activeListIndex = document.querySelector('.active-list-button').dataset.key;
    deleteButtons.forEach((element) => {
      element.addEventListener('click', deleteParent);
    });
  }
}

/**
 * Only for mobile screens. Sets the listener for the button to open the list menu.
*/
function setOpenMenuListener() {
  const openBtn = document.querySelector('.open-menu-span');
  const contentContainer = document.querySelector('.content');
  const listMenu = document.querySelector('.list-menu');
  const taskContainer = document.querySelector('.task-items-container');

  openBtn.addEventListener('click', () => {
    openBtn.style.display = 'none';
    contentContainer.style['ms-grid-rows'] = '100% 0';
    contentContainer.style.gridTemplateRows = '100% 0';
    listMenu.style.display = 'block';
    taskContainer.style.display = 'none';
  });
}

// Only for mobile screens. Sets the listener for the close list menu button.
function setMenuCloseListener() {
  const openBtn = document.querySelector('.open-menu-span');
  const contentContainer = document.querySelector('.content');
  const listMenu = document.querySelector('.list-menu');
  const closeBtn = document.querySelector('.closebtn');
  const taskContainer = document.querySelector('.task-items-container');

  closeBtn.addEventListener('click', () => {
    contentContainer.style['ms-grid-rows'] = '7% 93%';
    contentContainer.style.gridTemplateRows = '7% 93%';
    listMenu.style.display = 'none';
    openBtn.style.display = '';
    taskContainer.style.display = 'block';
  });
}

/**
 * Clears inline styles set by the mobile view.
 * Fixes style distortion when resizing page in browser after switching
 * to mobile view and back to full size.
 */
function setInlineCssListener() {
  const openBtn = document.querySelector('.open-menu-span');
  const listMenu = document.querySelector('.list-menu');
  const contentContainer = document.querySelector('.content');

  window.addEventListener('resize', () => {
    const width = window.innerWidth || document.documentElement.clientWidth
        || document.body.clientWidth;
    if (width > 601) {
      openBtn.removeAttribute('style');
      listMenu.removeAttribute('style');
      contentContainer.removeAttribute('style');
    }
  });
}

/**
 * Sets event listeners to open/close modal(s).
 * @param {element} modal The parent container that holds the modal content.
 * @param {element} openBtn The button which will open the modal.
 * @param {element} span The span container holding the close button.
 */
function setModalListeners(modal, openBtn, span) {
  const myModal = modal;
  const myOpenBtn = openBtn;
  const mySpan = span;

  myOpenBtn.onclick = () => {
    myModal.style.display = 'block';
  };

  // close modal when span(x) clicked
  mySpan.onclick = () => {
    myModal.style.display = 'none';
  };

  // close modal when user clicks outside the modal
  window.addEventListener('click', (event) => {
    if (event.target === myModal) {
      myModal.style.display = 'none';
    }
  });
}

/**
 * Creates a single task item with the task info passed in.
 * @param {*} task The task that will be displayed.
 * @param {*} index The index of the task, added as a data attribute for tracking.
 */
function createTaskContainer(task, index) {
  const container = document.querySelector('.task-items-container');

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');
  container.appendChild(taskContainer);

  const icon = document.createElement('span');
  icon.classList.add('material-icons', 'color');
  icon.textContent = 'check_circle_outline';
  icon.setAttribute('data-key', index);
  taskContainer.appendChild(icon);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('task-buttons-wrapper');
  taskContainer.appendChild(buttonWrapper);

  const taskButton = document.createElement('button');
  taskButton.classList.add('collapsible-task-button');
  taskButton.textContent = task.title;
  buttonWrapper.appendChild(taskButton);

  const itemDetails = document.createElement('div');
  itemDetails.classList.add('task-item-details');
  buttonWrapper.appendChild(itemDetails);

  const paraWrapper = document.createElement('div');
  paraWrapper.classList.add('para-wrapper');
  itemDetails.appendChild(paraWrapper);

  const leftPara = document.createElement('div');
  leftPara.classList.add('left-para');
  leftPara.textContent = `Priority: ${task.priority}`;
  paraWrapper.appendChild(leftPara);

  const rightPara = document.createElement('div');
  rightPara.classList.add('right-para');
  rightPara.textContent = `Due Date: ${task.dueDate}`;
  paraWrapper.appendChild(rightPara);

  const descriptionPara = document.createElement('p');
  descriptionPara.textContent = `Description: ${task.description}`;
  itemDetails.appendChild(descriptionPara);

  const notesPara = document.createElement('p');
  notesPara.textContent = `Notes: ${task.notes}`;
  itemDetails.appendChild(notesPara);
}

/**
 * Renders all task containers to the DOM for a single list.
 * @param {array} tasks The array of tasks
 * @param {boolean} isInitial Flag indicating whether it is the initial page load
 */
function renderTasks(tasks, isInitial) {
  let activeList = document.querySelector('.active-list-button');

  // on initial page load load all tasks for first list and set list button as active
  if (isInitial) {
    tasks.forEach((element, index) => {
      createTaskContainer(element, index);
    });
    activeList = document.querySelector('.list-object');
    activeList.classList.add('active-list-button');
  } else if (activeList) {
  // remove current task elements from DOM
    const currentTasks = Array.from(document.querySelectorAll('.task-container'));
    currentTasks.forEach((element) => {
      //element.remove(); below line does same as this. IE11 workaround
      element.parentNode.removeChild(element);
    });

    // create new task elements
    tasks.forEach((element, index) => {
      createTaskContainer(element, index);
    });
  }
  setCollapsibleContent();
  setDeleteTaskListeners();
  document.querySelector('#title').textContent = activeList.textContent;
}

/**
 * Adds a new list button to the page.
 * @param {string} name The name of the new List to be added.
 * @param {int} index The index of the new List being added which is set as a data attribute.
 */
function createListButton(name, index) {
  const listContainer = document.querySelector('.list-menu');
  const newListBtn = document.querySelector('.new-list-btn');
  const listDiv = document.createElement('div');

  listDiv.classList.add('list-object');
  listDiv.textContent = name;
  listDiv.dataset.key = index;

  // this listener gets the clicked list button and toggles the active-list-button class
  listDiv.addEventListener('click', (e) => {
    const clicked = e.target;
    const activeButton = document.querySelector('.active-list-button');
    if (activeButton) {
      activeButton.classList.remove('active-list-button');
    }
    clicked.classList.add('active-list-button');

    PubSub.publish('Render Tasks', clicked.dataset.key);
  });

  listContainer.insertBefore(listDiv, newListBtn);
}

/**
 * Renders all List buttons.
 * @param {array} allLists The array of List items to be rendered as buttons.
 */
function renderListButtons(allLists) {
  allLists.forEach((element, index) => {
    createListButton(element.name, index);
  });
}

/**
 * Takes input for new list form and publishes the input value.
 * @param {A} index The index of the new List button which will be added as a data attribute.
 */
function submitNewList(index) {
  const listNameInput = document.querySelector('#listNameInput');
  if (listNameInput.value !== listNameInput.defaultValue || listNameInput.value !== '') {
    createListButton(listNameInput.value, index);

    // publish the 'Update List Object' topic asynchronously
    PubSub.publish('Update List Object', listNameInput.value);

    // hide form and inputs
    listNameInput.value = '';
    document.querySelector('#new-list-modal').style.display = 'none';
  }
}

/**
 * Takes input from new task form, renders it to the DOM, and published the input data as a topic.
 */
function submitTaskInput() {
  const task = new Task('');
  const nameInput = document.querySelector('#taskName');
  const descInput = document.querySelector('#taskDescription');
  const dateInput = document.querySelector('#dueDate');
  const priority = document.querySelector('#priority');
  const notes = document.querySelector('#notes');
  let canSubmit = false;
  const taskList = document.querySelectorAll('.task-container');
  let index;
  if (taskList) {
    index = Array.from(taskList).length;
  } else { index = 0; }

  if (descInput.value !== descInput.defaultValue || descInput.value !== '') {
    task.description = descInput.value;
  } else {
    task.description = '';
  }
  if (dateInput.value !== dateInput.defaultValue || !dateInput.value) {
    task.dueDate = dateInput.value;
  } else {
    task.dueDate = '';
  }
  if (priority.value !== priority.defaultValue || priority.value !== '') {
    if (priority.value >= 1 && priority.value <= 5) {
      task.priority = priority.value;
      canSubmit = true;
    }
  } else {
    task.priority = '';
    canSubmit = true;
  }
  if (notes.value !== notes.defaultValue || notes.value !== '') {
    task.notes = notes.value;
  } else {
    task.notes = '';
  }
  if (nameInput.value !== nameInput.defaultValue || nameInput.value !== '') {
    task.title = nameInput.value;
  } else { canSubmit = false; }

  if (canSubmit) {
    PubSub.publish('Create New Task', task);

    nameInput.value = '';
    descInput.value = '';
    dateInput.value = '';
    priority.value = '';
    notes.value = '';
    document.querySelector('#new-task-modal').style.display = 'none';
    createTaskContainer(task, index);
    setCollapsibleContent();
    setDeleteTaskListeners();
  }
}

export {
  setCollapsibleContent, setInlineCssListener, setMenuCloseListener, setOpenMenuListener,
  setModalListeners, createListButton, renderListButtons, submitNewList, renderTasks,
  createTaskContainer, submitTaskInput,
};
