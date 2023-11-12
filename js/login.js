import { loginURL } from "./urls.js";

const form = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

/** 
 * API call that submits the user'
 * ```js
 * submitUser();
 * ```
 * @returns {Promise<void>} Promise object that represents the user
*/

async function submitUser() {
    const loginDetails = {
        email: email.value, 
        password: password.value,
    };
    const json = await loginUser(loginURL, loginDetails);

    if (json.accessToken) {
        window.location.href = 'profile/index.html';
    } else {    
        console.log('No token found');
    }
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitUser();
});

/**
 * API call that logs in a user
 * @param {string} url
 * @param {any} loginDetails
 * ```js
 * loginUser(loginURL, userToLogin);
 * ```
 */

async function loginUser(url, loginDetails) {
    try {
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails),
        };
        const response = await fetch(url, data);
        console.log(response);
        const json = await response.json();
        if (json.accessToken) {
            localStorage.setItem('accessToken', json.accessToken);
        } else {
            console.log('No token found');
        }
        localStorage.setItem("email", json.email);
        localStorage.setItem("username", json.name);
        return json;
    } catch (error) {
        console.log(error);
    }
};