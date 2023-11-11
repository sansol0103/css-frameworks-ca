import { profilesURL } from "./urls.js";
import { userId } from "./utils.js";

const postsURL = `${profilesURL}${userId}/posts/`;

async function getPosts(url) {
    try {
        const token = localStorage.getItem('accessToken');
        const data = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, data);
        const posts = await response.json();
        console.log(posts);
        return posts;
    } catch (error) {
        console.log(error);
    }
};

// Create HTML

function displayPostsHTML(post) {
    if (post) {
        const postContainer = document.querySelector('#post_container');

        const postsContainer = document.createElement('a');
        postsContainer.href = `post_specific.html?id=${post.id}`;
        postsContainer.classList.add('card', 'mt-3', 'mb-3');
        postsContainer.id = post.id;
        postContainer.appendChild(postsContainer);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('me-3');
        postsContainer.appendChild(imageContainer);

        const image = document.createElement('img');
        image.classList.add('img-fluid');
        image.src = post.media;
        imageContainer.appendChild(image);

        const textContainer = document.createElement('div');
        postsContainer.appendChild(textContainer);

        const title = document.createElement('h2');
        title.innerText = post.title;
        textContainer.appendChild(title);

        const content = document.createElement('p');
        content.innerText = post.body;
        textContainer.appendChild(content);

        const buttonContainer = document.createElement('div');
        postsContainer.appendChild(buttonContainer);
    }
};

function displayPosts(posts) {
    for (let i = 0; i < 25; i++) {
        displayPostsHTML(posts[i]);
    }
};

// Display posts

export async function displayUserPosts() {
    const userPosts = await getPosts(postsURL);
    displayPosts(userPosts);
};