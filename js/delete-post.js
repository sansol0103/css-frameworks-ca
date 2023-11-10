import { postsURL } from "./urls.js";
import { token } from "./utils.js";

export function addDeleteButtonEventListener() {
    const deleteButtons = document.querySelectorAll('#delete_button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function(event) {
            const postId = event.target.getAttribute('data-id');
            const url = `${postsURL}${postId}`;
            await deletePost(url);
            window.location.reload();
        });
    });
};

async function deletePost(url) {
    try {
        const data = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, data);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};