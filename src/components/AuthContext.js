import React, { useState } from 'react'
import Login from './Login';

const AuthContext = React.createContext();

function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login(user) {
        setIsAuthenticated(true);
        setUser(user);
    }

    function logout() {
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <div>
            <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

// const AuthConsumer = AuthContext.Consumer;

export {AuthContext, AuthProvider}