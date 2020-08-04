import React, { useState } from 'react'
// import Login from './Login';

const AuthContext = React.createContext();

function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    async function login(username, password) {
        try {
            const rawRes = await fetch(
                // `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/admins/login`,
                // `http://localhost:3000/.netlify/functions/server/admins/login`,
                `${process.env.REACT_APP_API_URL}/admins/login`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username,
                        password 
                    })
                }
            )
            const data = await rawRes.json();
            // console.log(data);

            if (!data.adminId) {
                return(data.message);
            } else {
                setRefreshToken(data.refreshToken);
                setAccessToken(data.accessToken);
                setUser(data.adminId);
                setIsAuthenticated(true);
            }

        } catch(e) {
            console.log(e)
        }
    }

    function logout() {

        fetch(
            // `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/admins/login`,
            `${process.env.REACT_APP_API_URL}/admins/logout`,
            // `http://localhost:3000/.netlify/functions/server/admins/logout`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    refreshToken
                })
            }
        )

        setRefreshToken(null);
        setAccessToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }

    // function saveAuthToLocalStorage() {
    //     localStorage.setItem('auth', JSON.stringify({
    //         user, accessToken, refreshToken
    //     }))
    // }

    // function loadAuthfromLocalStorage() {
    //     const data = JSON.parse(localStorage.getItem('auth'))
    // }

    return (
        <div>
            <AuthContext.Provider value={{
                user,
                isAuthenticated,
                accessToken,
                refreshToken,
                login,
                logout}}
            >
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export {AuthContext, AuthProvider}