import React from "react";
import { createBrowserRouter, Navigate, Route } from "react-router-dom";

import App from "../App";
import Login from "../pages/login";
import Product from "../pages/products";
import RegisterProduct from "../pages/registerProduct";
import ShoppingCart from "../pages/shoppingCart";

const ProtectedRoute = ({ path, element }) => {
  const token = localStorage.getItem("token"); 

  if (token) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
};

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      // Rotas protegidas
      { path: "/produtos", element: <ProtectedRoute path="/produtos" element={<Product />} /> },
      { path: "/cadastro", element: <ProtectedRoute path="/cadastro" element={<RegisterProduct />} /> },
      { path: "/carrinho", element: <ProtectedRoute path="/carrinho" element={<ShoppingCart />} /> },
    ],
  },
]);

export default Routes;
