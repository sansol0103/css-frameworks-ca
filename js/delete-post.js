import { postsURL } from "./urls.js";
import { token } from "./utils.js";
import { getQueryString } from "./utils.js";

async function deletePost(id) {
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