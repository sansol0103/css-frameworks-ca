export async function fetchAPI(url, userData) {
    const response = await fetch(url, userData);
    const result = await response.json();

    return result;
};