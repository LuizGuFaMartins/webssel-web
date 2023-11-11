import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../pages/login";
import Product from "../pages/products";
import RegisterProduct from "../pages/registerProduct";
import RegisterClient from "../pages/createUser";
import ShoppingCart from "../pages/shoppingCart";
import Auth from "./ProtectedRoutes"
import Payments from "../pages/payment";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/cadastroCliente", element: <RegisterClient /> },
      { path: "/produtos", element: <Auth><Product /></Auth> },
      { path: "/cadastro", element: <Auth><RegisterProduct /></Auth> },
      { path: "/carrinho", element: <Auth><ShoppingCart /></Auth> },
      { path: "/pagamentos", element: <Auth><Payments /></Auth> },
    ],
  },
]);

export default Routes;