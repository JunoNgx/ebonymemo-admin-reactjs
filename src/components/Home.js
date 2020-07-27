import React, { useEffect, useContext, useState } from 'react';
// import Login from './Login';
import { AuthContext } from './AuthContext';

export default function Home() {

    const auth = useContext(AuthContext);

    useEffect(() => {
        document.title = "Home - EbonyMemo admin panel";
    }, [])

    return (
        <div className="welcome">
            {(auth.isAuthenticated)
                ? <div>
                    <p>Administrator authenticated: <strong>{auth.user}</strong>.</p>
                    <button onClick={auth.logout}>Logout</button>
                </div>
                : <Login/>
            }
            <h4>Welcome to EbonyMemo admin panel</h4>
            <p>Use the navigation bar and manage content as needed. Documentation and guides are generally written on the respective pages.</p>
            <p>Don't hesitate to contact me if you have any question.</p>
        </div>
    )
}

function Login() {

    const auth = useContext(AuthContext);
    const [error, setError] = useState('Wrong username');

    function handleLoginSubmission() {
        auth.login();
    }

    return (
        <form className="login-panel">
            <label>
                <p>
                    Username
                    <input type="text"/>
                </p>
            </label>
            <label>
                <p>
                    Password
                    <input type="password"/>
                </p>
            </label>
            <p className="error">{error}</p>
            <button onClick={handleLoginSubmission}>Login</button>
            <p>If you have lost your password, please contact the administrator.</p>
        </form>
    )
}
