

import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from './routes';

import PrivateRoutes from "./privateRoutes";
import FallBackLoading from "../project/loader/fallBackLoading";

import SignIn from "../project/pages/signin";
import SignUp from "../project/pages/signup";

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

                {publicRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component}/>
                ))}
            </Routes>
        </Suspense>
    );
}