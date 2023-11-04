import Login from "../../pages/login";
import VsEngine from '../engine/vsEngine';
import Profile from "../../pages/profile";
import Register from "../../pages/register";
import SectionIntro from "../../pages/sectionIntro";
import MainTemplateBoard from "../boardTemplate/mainTemplate";


const publicRoutes = [
    { path: '/', component: <SectionIntro /> },
    { path: '/GameStart', component: <MainTemplateBoard /> },
    { path: '/vsEngine', component: <VsEngine /> },
    { path: '/Login', component: <Login /> },
    { path: '/Register', component: <Register /> },
    { path: '/Profile', component: <Profile /> },
    { path: '*', component: <SectionIntro /> },
];

export { publicRoutes }; 