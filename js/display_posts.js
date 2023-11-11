import { postsURL } from './urls.js';
import { token } from './utils.js';

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
    }
    try {
        const data = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, data);
        const json = await response.json();
        return json;
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

function createPostHTML(post) {
    const container = document.querySelector('#posts-container');

    const card = document.createElement('a');
    card.href = `post_specific.html?id=${post.id}`;
    card.classList.add('card', 'mt-3', 'mb-3');
    container.appendChild(card);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'container');
    card.appendChild(cardBody);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('col-12', 'col-md-6', 'mb-3');
    cardBody.appendChild(imageContainer);

    const image = document.createElement('img');
    image.classList.add('img-fluid');
    image.src = post.media;
    imageContainer.appendChild(image);

    const textContainer = document.createElement('div');
    cardBody.appendChild(textContainer);

    const title = document.createElement('h2');
    title.innerText = post.title;
    textContainer.appendChild(title);

    const content = document.createElement('p');
    content.innerText = post.body;
    textContainer.appendChild(content);
};

/**
 * Creates HTML for all posts
 * @param {object} posts
 * ```js
 * createPosts(posts);
 * ```
 * @returns {Promise<void>} Promise object that represents the HTML
 */

function createPosts(posts) {
    for (let i = 0; i < 25; i++) {
        createPostHTML(posts[i]);
    }
};

/** 
 * Main function that builds the page
 * ```js
 * main();
 * ```
 * @returns {Promise<void>} Promise object that represents the main function
*/

async function displayPosts() {
    const posts = await getPosts(postsURL);
    createPosts(posts);
};

displayPosts();