import { postsURL } from "./urls.js";
import { token } from "./utils.js";
import { getQueryString } from "./utils.js";

/**
 * API call that deletes a post. If the user is not authenticated, they will be redirected to the login page.
 * @param {string} url
 * @param {number} id
 * ```js
 * deletePost(postsURL, id);
 * ```
 * @returns {Promise} Promise object that represents the deleted post
 * ```js
 */

async function deletePost(id) {
    if (!token) {
        window.location.href = 'login.html';
    };
    try {
        const data = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(postsURL + id, data);
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error);
    }
};

function addDeleteButtonListener() {
    const deleteButton = document.querySelector('#delete_button');
    deleteButton.addEventListener('click', (event) => {
        const postId = getQueryString();
        deletePost(postId);
    });
};

addDeleteButtonListener();