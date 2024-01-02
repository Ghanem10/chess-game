const titleMap = {
    "/": "Main page",
    "/match": "Match",
    "/signin": "Sign In",
    "/signup": "Sign Up",
    "/profile": "User Profile",
    "/vsengine": "Vs Engine",
    "/tournament": "Tournaments",
};

/**
 * Returns the title of a page based on its route path.
 * @param {string} path - The path of the page route.
 * @returns {string} The title of the page with the site name appended.
*/

export const getTitleFromRoute = (path) => {
    if (titleMap[path]) {
        return `${titleMap[path]} | ChessPlus`;
    }
};