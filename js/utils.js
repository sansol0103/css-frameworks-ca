export const userId = localStorage.getItem('name');
export const token = localStorage.getItem('accessToken');

/**
 * Gets the query string from the URL
 * ```js
 * getQueryString();
 * ```
 * @returns {string} postId
 */

export function getQueryString() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const postId = params.get('id');
    return postId;
};