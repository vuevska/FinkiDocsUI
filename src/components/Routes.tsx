import React from 'react';
import App from "../App";
import Favourites from "./Favourites";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const createRoutes = () => (


    <Router>
        <Routes>

            {/*<Route path="/" element={<App/>}/>*/}
            <Route path="/favourites" element={<Favourites/>}/>
        </Routes>

    </Router>

);

export default createRoutes;