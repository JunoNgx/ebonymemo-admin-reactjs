import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function Home() {

    const auth = useContext(AuthContext);

    useEffect(() => {
        document.title = "Home - EbonyMemo admin panel";
    }, [])

    return (
        <div className="welcome">
            {(auth.isAuthenticated)
                ? <>
                    <p>Administrator authenticated: <strong>{auth.user}</strong>.</p>
                    <button onClick={auth.logout}>Logout</button>
                    <p>For security and implementation reason, your login session will only last <strong>one hour</strong>, and your session data will not be stored in any way, requiring you to login again with each page refresh.</p>
                    <p>Please take note to avoid regrettable loss of data and don't hesitate to contact Juno if you have any question.</p>
                </>
                : <>
                    <Login/>
                    <p>You have reached <strong>EbonyMemo</strong> admin panel.</p>
                    <p>While there are areas of the website you can take a look at, most of the website functions require an admin credential. This page is reserved only for administrators of EbonyMemo.</p>
                    <p>If you are visitor, please feel free to browse our content at <a href="http://ebonymemo.com" target={"_blank"}>EbonyMemo.com</a>.</p>
                </>
            }
        </div>
    )
}

function Login() {

    const auth = useContext(AuthContext);
    const [error, setError] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginSubmission(e) {

        e.preventDefault();
        setError('')

        if (username === '') {
            setError('Please enter username');
        }

        if (password === '') {
            setPassword('Please enter password')
        }

        const res = await auth.login(username, password);
        setError(res);
    }

    return (
        <form className="login-panel">
            <label>
                <p>
                    Username
                    <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                </p>
            </label>
            <label>
                <p>
                    Password
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </p>
            </label>
            <p className="error">{error}</p>
            <button onClick={handleLoginSubmission}>Login</button>
            <p>If you have lost your password, please contact Juno.</p>
        </form>
    )
}
