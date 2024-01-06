import NotFound from "../project/pages/notFound";
import Home from "../project/pages/Home";

import Puzzle from "../project/pages/puzzle";
import Community from "../project/pages/community";

import MainTemplateBoard from "../project/pages/match";
import MatchVsEngine from '../project/pages/vsengine';
import Tournaments from "../project/pages/tournaments";

import Profile from "../project/pages/profile";

const privateRoutes = [
    { 
        path: "/match", 
        component: <MainTemplateBoard />
    },
    { 
        path: "/vsengine", 
        component: <MatchVsEngine /> 
    },
    { 
        path: "/profile", 
        component: <Profile /> 
    },
    { 
        path: "/tournament", 
        component: <Tournaments /> 
    },
    { 
        path: "/puzzle-games", 
        component: <Puzzle /> 
    },
    {
        path: "/community",
        component: <Community />
    },
    {
        path: "*",
        component: <NotFound />
    }
];

const publicRoutes = [
    {
        path: "/",
        component: <Home />
    },
    {
        path: "puzzle",
        component: <Puzzle />
    },
    {
        path: "community",
        component: <Community />
    },
    {
        path: "*",
        component: <NotFound />
    }
];

export { privateRoutes, publicRoutes };