import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../project/components/routes/authrouters";
import { useWindowDimensions } from "./folder/calc";
import MAP from './folder/MAP';

import './App.scss';

export default function App() {

    const { width } = useWindowDimensions();
    
    return (
        <React.Fragment>
            {
                (width <= 10) ? (
                    <MAP />
                ) : (
                    <Routes>
                        {publicRoutes.map((element, idx) => (
                            <Route key={idx} path={element.path} element={element.component}/>
                        ))}
                    </Routes>
                )
            }
        </React.Fragment>
    );
}