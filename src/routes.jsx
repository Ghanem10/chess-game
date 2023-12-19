import { lazy } from "react";

import Puzzle from "../project/pages/puzzle";
import Profile from "../project/pages/profile";
import NotFound from "../project/pages/notFound";
import Community from "../project/pages/community";

import MainTemplateBoard from "../project/pages/match";
import MatchVsEngine from '../project/pages/vsengine';
import Tournaments from "../project/pages/tournaments";


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

export { privateRoutes };