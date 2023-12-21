import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";

import { getTitleFromRoute } from "../project/util/titlesDoc";
import { ErrorComponent } from '../project/components/Error/errorComponent';
import { createAppStore } from "../project/redux/store";

import { DotLoader } from "react-spinners";

import App from "./App";
import axios from "axios";

import "../project/assets/scss/errors/error.scss";

export default function AppContiner() {
    const location = useLocation();
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_URL}/test`);
            } catch (error) {
                setError("Server is down at the moment, please try again later.");
            } finally {
                setLoading(false);
            }
        };
        
        checkServerStatus();
    }, []);


    useEffect(() => {
        const initializeStore = async () => {
            try {
                const appStore = await createAppStore();
                setStore(appStore);
            } catch (error) {
                setError(`Error initializing the app: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        initializeStore();
    }, []);

    if (loading || error) {
        return (
            <div className="message">
                {loading ? <DotLoader color="#fff"/> : <ErrorComponent errorMessage={error} />}
            </div>
        );
    }

    return (
        <Provider store={store}>
            <Helmet>
                <title>{getTitleFromRoute(location.pathname)}</title>
            </Helmet>
            <App />
        </Provider>
    );
}