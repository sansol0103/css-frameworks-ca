// URLS and form parts declared

const API_BASE_URL = 'https://api.noroff.dev';
const registerURL = `${API_BASE_URL}/api/v1/social/auth/register`;

const form = document.querySelector('#registerForm');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

// Submits the user

async function submitUser() {
    const user = {
        name: username.value, 
        email: email.value, 
        password: password.value, 
    };
    const json = await registerUser(registerURL, user);
    console.log(json);
};

// Listens for the submit event

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitUser();
});

// Registers the user

/**
 * API call that registers a user
 * @param {string} url 
 * @param {any} userData 
 * ```js
 * registerUser(registerURL, user);
 * ```
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

// Email: sansol92975@stud.noroff.no
// Username: sandersol
// Password: Sandersol01