import { postsURL } from './api.js';
import { getQueryString } from './utils.js';
import { token } from './utils.js';

/**
 * API call that gets a post. If the user is not authenticated, they will be redirected to the login page.
 * @param {string} url
 * @param {number} id
 * ```js
 * getPost(postsURL, id);
 * ```
 * @returns {Promise} Promise object that represents the post
 * ```js
 */

async function getPost(url) {
    const postId = getQueryString('id');
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
        const response = await fetch(url + postId, data);
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    };
};

/**
 * Builds HTML for the page
 * @param {object} post
 * ```js
 * createHTML(post);
 * ```
 * @returns {Promise<void>} Promise object that represents the HTML
 */

function createHTML(post) {
    const container = document.querySelector('#post_container');

    const card = document.createElement('div');
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

    pageTitle.innerText = post.title;
};

/**
 * Main function that builds the page
 * ```js
 * main();
 * ```
 * @returns {Promise<void>} Promise object that represents the main function
 */

async function main() {
    const post = await getPost(postsURL);
    createHTML(post);
};

main();