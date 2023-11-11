import { registerURL } from './urls.js';

/**
 * Function that submits the user
 * ```js
 * submitUser();
 * ```
 * @returns {Promise<void>} Promise object that represents the user
 */

async function submitUser() {
    const user = {
        name: username.value, 
        email: email.value, 
        password: password.value, 
    };
    const json = await registerUser(registerURL, user);
    console.log(json);
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitUser();
});

/**
 * API call that registers a user
 * @param {string} url 
 * @param {any} userData 
 * ```js
 * registerUser(registerURL, user);
 * ```
 * @returns {Promise} Promise object that represents the registered user
 */

async function registerUser(url, user) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }
        const response = await fetch(url, postData);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};
