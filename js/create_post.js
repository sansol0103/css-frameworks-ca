import { postsURL } from "./urls.js";

const createPostForm = document.querySelector('#create_post_form');

const token = localStorage.getItem('accessToken');

const newPostTitle = document.querySelector('#post_title');
const newPostContent = document.querySelector('#post_content');
const newPostImage = document.querySelector('#post_image');

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