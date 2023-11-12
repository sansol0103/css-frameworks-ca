import { postsURL } from "./urls.js";
import { token } from "./utils.js";

const createPostForm = document.querySelector('#create_post_form');

const newPostTitle = document.querySelector('#post_title');
const newPostContent = document.querySelector('#post_content');
const newPostImage = document.querySelector('#post_image');

/**
 * API call that creates a post
 * @param {string} url
 * @param {any} postData
 * ```js
 * createPost(postsURL, postData);
 * ```
 * @returns {Promise} Promise object that represents the created post
 */

createPostForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = newPostTitle.value;
    const content = newPostContent.value;
    const image = newPostImage.value;

    const postData = {
        title: title,
        body: content,
        media: image,
    };

    const data = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    };

    fetch(postsURL, data)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
});