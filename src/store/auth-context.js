import React, { createContext, useState } from 'react';
let logoutTimer;
export const AuthContext = createContext({
    token: 'sss',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

export const AuthStore = ({ children }) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;


    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const loginHandler = (token, expirationTime) => {
        console.log(token);
        setToken(token);
        localStorage.setItem('token', token);

        const remainingTime = calculateRemainingTime(expirationTime);

        setTimeout(logoutHandler, remainingTime)
    };

    const STORE = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={STORE}>
            {children}
        </AuthContext.Provider>
    );
}

