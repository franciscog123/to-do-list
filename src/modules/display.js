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
 * Sets event listeners to open/close modal.
 */
function setListModalListeners() {
  const modal = document.getElementById('new-list-modal');
  const openBtn = document.querySelector('.new-list-btn');
  const span = document.querySelector('#close-list-modal');

  openBtn.onclick = () => {
    modal.style.display = 'block';
  };

  // close modal when span(x) clicked
  span.onclick = () => {
    modal.style.display = 'none';
  };

  // close modal when user clicks outside the modal
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

export {
  setCollapsibleContent, setInlineCssListener, setMenuCloseListener, setOpenMenuListener,
  setListModalListeners,
};
