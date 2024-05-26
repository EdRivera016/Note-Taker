// Variables to store references to DOM elements 
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearBtn;
let noteList;


// Check if the current path is '/notes', and if so, select the neccesary elements
if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// Variable to keep track of the note currently being edited or viewed
let activeNote = {};

// Fetch notes from the server
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Save a new note to the server
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  // Delete a note from the server by ID
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });


  // Render the currently active note
const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
        // If there is an active note, display its details in readonly mode
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
        // If there is no active note, clear the inputs for new note entry
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

// Handle saving a new note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };

    // Save the note and refresh the list of notes
  saveNoteBtn.style.display = 'none';
  clearBtn.style.display = 'inline';
  newNoteBtn.style.display = 'inline';

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Handle deleting a note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    // If the deleted note is the active note, reset the active note
  if (activeNote.id === noteId) {
    activeNote = {};
  }

    // Delete the note and refresh the list of notes
  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Handle viewing a note
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();0
  show(saveNoteBtn);
  show(clearBtn);
};

// Handle creating a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
  show(saveNoteBtn);
  show(clearBtn);
};


// Handle rendering the save button only if there is text in the title and body
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Helper function to create a list item (li) element
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

        // Add a delete button to the list item if required
    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

    // If there are no notes, display a message
  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

    // Create list items for each note
  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

    // Append the list items to the note list
  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Clear the note input fields and hide the save and clear buttons
const handleClearForm = () => {
  noteTitle.value = '';
  noteText.value = '';
  hide(saveNoteBtn);
  hide(clearBtn);
  show(newNoteBtn);
};

// Add event listeners if on the '/notes' page
if (window.location.pathname === '/notes') {
  clearBtn.addEventListener('click', handleClearForm);
}

// Fetch and render the list of notes from the server
const getAndRenderNotes = () => getNotes().then(renderNoteList);

// Add event listeners if on the '/notes' page
if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

// Initial fetch and render of the notes
getAndRenderNotes();