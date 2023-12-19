
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { initializeAuth } from "./actions/authAction"
import { tokenMiddleware } from "../middleware/refreshTokenMiddleware";
import rootReducer from "./reducers";


export const createAppStore = async () => {
    try {
        const store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                    serializableCheck: false,
                }).concat([thunk, tokenMiddleware])
        });

        await store.dispatch(initializeAuth());

        return store;
    } catch (error) {
        throw new Error("Some error occurred");
    }
};