const buttonContainer = document.querySelector('#button_container');

/**
 * Creates buttons for the page
 * ```js
 * createButtons();
 * ```
 * @returns {Promise<void>} Promise object that represents the HTML
 */

function createButtons() {
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary');
    editButton.innerText = "Edit";
    editButton.id = "edit_button";
    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.id = "delete_button";
    deleteButton.innerText = "Delete";
    buttonContainer.appendChild(deleteButton);
};

createButtons();