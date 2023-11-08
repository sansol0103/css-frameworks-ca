const API_BASE_URL = 'https://api.noroff.dev';
const profilesURL = `${API_BASE_URL}/api/v1/social/profiles/`;

const userId = localStorage.getItem('name');

const pageTitle = document.querySelector('title');

async function getProfile(profilesURL) {
    try {
        const token = localStorage.getItem('accessToken');
        const data = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(profilesURL + userId, data);    
        const user = await response.json();
        return user;
    } catch (error) {
        console.log(error);
    }
};

getProfile(profilesURL);

function displayUser(user) {
    const userContainer = document.querySelector('#user_container');
    const avatarContainer = document.querySelector('#avatar_container');

    const username = document.createElement('p');
    username.innerText = user.name;
    username.classList.add('h2');
    userContainer.appendChild(username);

    if (user.avatar) {
        const avatar = document.createElement('img');
        avatar.classList.add('img-fluid');
        avatar.src = user.avatar;
        avatarContainer.appendChild(avatar);
    } else {
        const avatar = document.createElement('img');
        avatar.classList.add('img-fluid');
        avatar.src = "https://www.w3schools.com/howto/img_avatar.png";
        avatarContainer.appendChild(avatar);
    }

    const followers = document.createElement('p');
    followers.innerText = "Followers: " + user._count.followers;
    followers.classList.add('h3');
    userContainer.appendChild(followers);

    const following = document.createElement('p');
    following.innerText = "Following: " + user._count.following;
    following.classList.add('h3');
    userContainer.appendChild(following);

    const posts = document.createElement('p');
    posts.innerText = "Posts: " + user._count.posts;
    posts.classList.add('h3');
    userContainer.appendChild(posts);

    pageTitle.innerText += user.name;
};

async function main() {
    const user = await getProfile(profilesURL);
    displayUser(user);
}

main();

function logOut () {
    localStorage.removeItem('accessToken');
    window.location.href = "../index.html";
};

const logOutButton = document.querySelector('#logout_button');

logOutButton.addEventListener('click', logOut);