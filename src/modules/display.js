import PubSub from 'pubsub-js';
import 'core-js';

/**
 * Sets the listeners on all task items so that they are collapsible when clicked.
 */
function setCollapsibleContent() {
  const taskButtons = Array.from(document.getElementsByClassName('collapsible-task-button'));

  for (let i = 0; i < taskButtons.length; i += 1) {
    // eslint-disable-next-line func-names
    taskButtons[i].addEventListener('click', function () {
      this.classList.toggle('active');
      const taskDetails = this.nextElementSibling;
      if (taskDetails.style.maxHeight) {
        taskDetails.style.maxHeight = null;
      } else {
        taskDetails.style.maxHeight = `${taskDetails.scrollHeight}px`;
      }
    });
  }
}

/**
 * Sets the listeners on all delete buttons to remove the associated tasks containers.
 * Publishes topic 'Delete Task' to app logic.
 */
function setDeleteTaskListeners() {
  const deleteButtons = Array.from(document.getElementsByClassName('material-icons'));

  if (deleteButtons) {
    const activeListIndex = document.querySelector('.active-list-button').dataset.key;
    deleteButtons.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.target.parentElement.remove();
        PubSub.publish('Delete Task', [event.target.dataset.key, activeListIndex]);
      });
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
 * Creates a single collapsible task item with the task info passed in.
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
      element.remove();
    });

    // create new task elements
    tasks.forEach((element, index) => {
      createTaskContainer(element, index);
    });
  }
  setCollapsibleContent();
  setDeleteTaskListeners();
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

    console.log(`render tasks ${clicked.dataset.key}`);
    // TODO fix bug when rendering additional tasks
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

export {
  setCollapsibleContent, setInlineCssListener, setMenuCloseListener, setOpenMenuListener,
  setModalListeners, createListButton, renderListButtons, submitNewList, renderTasks,
  createTaskContainer,
};
