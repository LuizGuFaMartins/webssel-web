import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../pages/login";
import Product from "../pages/products";
import RegisterProduct from "../pages/registerProduct";
import ShoppingCart from "../pages/shoppingCart";
import Auth from "./ProtectedRoutes"

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/produtos", element: <Auth><Product /></Auth> },
      { path: "/cadastro", element: <Auth><RegisterProduct /></Auth> },
      { path: "/carrinho", element: <Auth><ShoppingCart /></Auth> },
    ],
  },
]);

export default Routes;