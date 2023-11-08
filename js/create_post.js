import { fetchAPI } from "./API/fetchAPI.mjs";
import { postsURL } from "./urls.mjs";
import { displayUserPosts } from "./display_user_posts.js";

const createNewPostForm = document.querySelector('#create_post_form');

const token = localStorage.getItem('accessToken');

const newPostTitle = document.querySelector('#post_title');
const newPostContent = document.querySelector('#post_content');
const newPostImage = document.querySelector('#post_image');

const postTitle = newPostTitle.value;
const postContent = newPostContent.value;
const postImage = newPostImage.value;

// console.log(postTitle);
// console.log(postContent);
// console.log(postImage);

const postData = {
    title: postTitle,
    body: postContent,
    media: postImage,
};

// console.log(postData);

const data = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
};

async function createPost(data) {
    try {
        const response = await fetchAPI(postsURL, data);

        if (response && response.id) {
            console.log(response);
            displayUserPosts(response);
            createNewPostForm.reset();
        };
    } catch (error) {
        console.log(error);
    };
};

createNewPostForm.addEventListener('submit', (event) => {
    event.preventDefault();

    createPost(data);
    window.location.reload();
});