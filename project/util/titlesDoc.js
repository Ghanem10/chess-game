const titleMap = {
    "/": "Main page",
    "/match": "Match",
    "/signin": "Sign In",
    "/signup": "Sign Up",
    "/profile": "User Profile",
    "/vsengine": "Vs Engine",
    "/tournaments": "Tournaments",
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
  
    const userProfileRegex = /^\/user\/(\w+)$/;
    const tournamentRegex = /^\/tournament\/(\w+)$/;
    const vsengineRegex = /^\/vsengine\/(\w+)$/;
    const matchRegex = /^\/match\/(\w+)$/;
  
    if (userProfileRegex.test(path)) {
        return "User Profile | ChessPlus";
    } else if (tournamentRegex.test(path)) {
        return "Tournament | ChessPlus";
    } else if (vsengineRegex.test(path)) {
        return "Vs Engine | ChessPlus";
    } else if (matchRegex.test(path)) {
        return "Match | ChessPlus";
    }
  
    return "ChessPlus";
};