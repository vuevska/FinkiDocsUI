import React from 'react';
import App from "../App";
import Favourites from "./Favourites";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Document from "./Document";

const createRoutes = () => (


        <Routes>

            <Route path="/" element={<Document/>}/>
            <Route path="/favourites" element={<Favourites/>}/>
        </Routes>


);

export default createRoutes;