import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsPage from "@/components/page/ProductsPage";

const App = () => {
    console.log('Token:', localStorage.getItem('token'));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductsPage/>} />
                <Route path="/products" element={<ProductsPage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;



