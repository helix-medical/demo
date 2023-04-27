import React from 'react';
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [auth, setAuth] = useState(localStorage.getItem('auth') ?? false);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
