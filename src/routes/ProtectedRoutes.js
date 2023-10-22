import React from 'react';
import {Navigate} from   "react-router-dom";


const Auth = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

 
export default Auth;