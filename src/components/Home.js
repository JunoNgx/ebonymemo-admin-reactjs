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
                    <p>You have reached <strong>{"{Ebony Memo}"}</strong> content management application GUI.</p>
                    <p>While the content of this application is generally accessible to the public, credentials and authorization token are required for any data altering operation. If you would like to contribute, please contact Juno via email or Twitter.</p>
                    <p>If you are a visitor, please feel free to browse the content at <a href="http://ebonymemo.com" target={"_blank"}>EbonyMemo.com</a>.</p>
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
            return;
        }

        if (password === '') {
            setError('Please enter password')
            return;
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
