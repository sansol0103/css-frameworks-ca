const API_BASE_URL = 'https://api.noroff.dev';
const postsURL = `${API_BASE_URL}/api/v1/social/posts`;

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
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    }
};

getPosts(postsURL);

// Create HTML

function createPostHTML(post) {
    const container = document.querySelector('#posts-container');

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
};

function createPosts(posts) {
    for (let i = 0; i < 25; i++) {
        createPostHTML(posts[i]);
    }
};

// Display posts

async function displayPosts() {
    const posts = await getPosts(postsURL);
    createPosts(posts);
};

displayPosts();