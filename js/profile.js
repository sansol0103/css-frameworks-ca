import { profilesURL } from "./urls.js";
import { userId } from "./utils.js";
import { displayUserPosts } from "./display_user_posts.js";

const pageTitle = document.querySelector('title');

/** 
 * API call that gets a user's profile. If the user is not authenticated, they will be redirected to the login page.
 * @param {string} url
 * @param {number} id
 * ```js
 * getProfile(profilesURL, id);
 * ```
 * @returns {Promise} Promise object that represents the user's profile
*/

async function getProfile(url) {
    try {
        const token = localStorage.getItem('accessToken');
        const data = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url + userId, data);    
        const user = await response.json();
        return user;
    } catch (error) {
        console.log(error);
    }
};

/** 
 * Builds HTML for the page
 * @param {object} user
 * ```js
 * createHTML(user);
 * ```
 * @returns {Promise<void>} Promise object that represents the HTML
*/

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

/**
 * Main function that builds the page
 * ```js
 * main();
 * ```
 * @returns {Promise<void>} Promise object that represents the main function
 */

async function main() {
    const user = await getProfile(profilesURL);
    displayUser(user);
}

main();

/** 
 * Logs the user out. Removes the access token from local storage and redirects the user to the login page.
 * ```js
 * logOut();
 * ```
 * @returns {Promise<void>} Promise object that represents the logout function
*/

function logOut () {
    localStorage.removeItem('accessToken');
    window.location.href = "../index.html";
};

const logOutButton = document.querySelector('#logout_button');

logOutButton.addEventListener('click', logOut);

displayUserPosts();