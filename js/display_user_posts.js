import { profilesURL } from "./urls.js";
import { userId } from "./utils.js";
import { token } from "./utils.js";

const postsURL = `${profilesURL}${userId}/posts/`;

/**
 * API call that gets posts. If the user is not authenticated, they will be redirected to the login page.
 * @param {string} url
 * ```js
 * getPosts(postsURL);
 * ```
 * @returns {Promise} Promise object that represents the posts
 */

async function getPosts(url) {
    if (!token) {
        window.location.href = 'login.html';
    };
    try {
        const data = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, data);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.log(error);
    }
};

/** 
 * Builds HTML for the page
 * @param {object} post
 * ```js
 * createHTML(post);
 * ```
 * @returns {Promise<void>} Promise object that represents the HTML
*/

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

/** 
 * Displays posts on the page
 * @param {object} posts
 * ```js
 * displayPosts(posts);
 * ```
 * @returns {Promise<void>} Promise object that represents the HTML
*/

function displayPosts(posts) {
    for (let i = 0; i < 25; i++) {
        displayPostsHTML(posts[i]);
    }
};

/** 
 * Main function that builds the page
 * ```js
 * main();
 * ```
 * @returns {Promise<void>} Promise object that represents the main function
*/

export async function displayUserPosts() {
    const userPosts = await getPosts(postsURL);
    displayPosts(userPosts);
};