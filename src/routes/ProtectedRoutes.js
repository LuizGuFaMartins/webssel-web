import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp"); 
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const checkTokenExpiration = () => {
     
            const now = new Date().getTime();
            // const tokenExpirationTime = 10 * 60 * 1000; 
            const tokenExpirationTime = 10 * 1000; 

            if (now - parseInt(tokenTimestamp, 10) >= tokenExpirationTime) {
                localStorage.removeItem("token");
                localStorage.removeItem("tokenTimestamp");
                setShouldRedirect(true);
            }
        };

        const interval = setInterval(checkTokenExpiration, 20 * 1000);
        return () => clearInterval(interval);

    }, [token, tokenTimestamp]);

    if (shouldRedirect || !token || !tokenTimestamp) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default Auth;
