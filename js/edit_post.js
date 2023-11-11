import { postsURL } from "./urls.js";
import { token } from "./utils.js";
import { getQueryString } from "./utils.js";

async function editPost(id) {
    try {
        const data = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title.value,
                body: body.value,
            }),
        };
        const response = await fetch(postsURL + id, data);
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error);
    }
}