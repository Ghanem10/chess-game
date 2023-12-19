

import { Suspense } from "react";
import { useSelector } from "react-redux";
import PrivateRoutes from "./privateRoutes";
import { Route, Routes } from "react-router-dom";
import { privateRoutes } from './routes';
import FallBackLoading from "../project/loader/fallBackLoading";

import Home from "../project/pages/Home";
import SignIn from "../project/pages/signin";
import SignUp from "../project/pages/signup";
import NotFound from "../project/pages/notFound";

import '../project/assets/scss/app.scss';

export default function App() {

    const userData = useSelector((state) => state.auth?.userData);

    return (
        <Suspense fallback={FallBackLoading}>
            <Routes>
                <Route element={<PrivateRoutes userData={userData} />}>
                    {privateRoutes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component}/>
                    ))}
                </Route>

                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}