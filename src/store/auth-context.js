import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    token: 'sss',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
});

export const AuthStore = ({ children }) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        console.log(token);
        setToken(token)
    };

    const logoutHandler = () => {
        setToken(null)
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

