/**
 * Creates a collapsible individual task item.
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
 * Only for mobile screens. Sets the listener for the open button so it opens smoothly.
*/
function setOpenMenuListener() {
  const openBtn = document.querySelector('.open-menu-span');
  const contentContainer = document.querySelector('.content');
  const listMenu = document.querySelector('.list-menu');
  openBtn.addEventListener('click', () => {
    openBtn.style.display = 'none';
    contentContainer.style.gridTemplateRows = '100% 0';
    listMenu.style.display = 'block';
  });
}

// Only for mobile screens. Sets the listener for the close button so it closes smoothly.
function setMenuCloseListener() {
  const openBtn = document.querySelector('.open-menu-span');
  const contentContainer = document.querySelector('.content');
  const listMenu = document.querySelector('.list-menu');
  const closeBtn = document.querySelector('.closebtn');

  closeBtn.addEventListener('click', () => {
    contentContainer.style.gridTemplateRows = '7% 93%';
    listMenu.style.display = 'none';
    openBtn.style.display = '';
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

export {
  setCollapsibleContent, setInlineCssListener, setMenuCloseListener, setOpenMenuListener,
  setModalListeners,
};
