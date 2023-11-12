import { postsURL } from "./urls.js";
import { token } from "./utils.js";
import { getQueryString } from "./utils.js";

const id = getQueryString('id');

const editPostForm = document.querySelector('#edit_post_form');

const titleInput = document.querySelector('#post_title');
const bodyInput = document.querySelector('#post_body');
const mediaInput = document.querySelector('#post_media');

/** 
 * API call that edits a post
 * @param {string} url
 * @param {any} postData
 * ```js
 * editPost(postsURL, postData);
 * ```
 * @returns {Promise} Promise object that represents the edited post
*/

editPostForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const body = bodyInput.value;
    const media = mediaInput.value;

    const postData = {
        title: title,
        body: body,
        media: media,
    };

    const url = `${postsURL}${id}`;

    const data = {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    };

    fetch(url, data)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(error => console.log(error));
});

const editModal = document.querySelector('#edit_modal');
const editButton = document.querySelector('#edit_button');

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    editModal.style.display = 'block';
});

const closeModalButton = document.querySelector('#close_modal_button');

closeModalButton.addEventListener('click', (event) => {
    event.preventDefault();
    editModal.style.display = 'none';
});