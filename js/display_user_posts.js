import { fetchAPI } from "./fetch_api.js";
import { postsURL } from "./urls.mjs";

export async function displayUserPosts() {
    if (!accessToken) {
        window.location.href = "../index.html";
    }
    try {
        const data = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        let postList = await fetchAPI(postsURL + `?_author=true`, data);
        displayPosts(postList);
        } catch (error) {
            console.log(error);
        }
    };

export function displayPosts(post) {
    const postContainer = document.querySelector('#post_container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('me-3');
    postContainer.appendChild(imageContainer);

    const image = document.createElement('img');
    image.classList.add('img-fluid');
    image.src = post.media;
    imageContainer.appendChild(image);

    const textContainer = document.createElement('div');
    postContainer.appendChild(textContainer);

    const title = document.createElement('h2');
    title.innerText = post.title;
    textContainer.appendChild(title);

    const content = document.createElement('p');
    content.innerText = post.body;
    textContainer.appendChild(content);
};