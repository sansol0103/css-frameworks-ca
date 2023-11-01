const API_BASE_URL = 'https://api.noroff.dev';
const postsURL = `${API_BASE_URL}/api/v1/social/posts/`;

// Get queryString

const pageTitle = document.querySelector('title');

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const postId = params.get('id');

async function getPost(url) {
    try {
        const token = localStorage.getItem('accessToken');
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

async function main() {
    const post = await getPost(postsURL);
    createHTML(post);
};

main();