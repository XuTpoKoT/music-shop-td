import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductsPage from "@/components/page/ProductsPage";
import SignInPage from "@/components/page/SignInPage";
import SignUpPage from "@/components/page/SignUpPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetailsPage from "@/components/page/ProductDetailsPage";
import CartPage from "@/components/page/CartPage";
import ProfilePage from "@/components/page/ProfilePage";
import OrdersPage from "@/components/page/OrdersPage";

const App = () => {
    console.log('Token:', localStorage.getItem('token'));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductsPage/>} />
                <Route path="/products" element={<ProductsPage/>} />
                <Route path="/sign-up" element={<SignUpPage/>} />
                <Route path="/sign-in" element={<SignInPage/>} />
                <Route path="/products/:id" element={<ProductDetailsPage/>} />
                <Route path="/users/:username" element={<ProfilePage/>} />
                <Route path="/users/:username/cartItems" element={<CartPage/>} />
                <Route path="/orders" element={<OrdersPage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;



