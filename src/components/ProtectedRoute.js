// Component is actually not used

import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function ProtectedRoute ({ children, ...rest}) {

    const auth = useContext(AuthContext)

    return <Route {...rest}
        render={() => (
            auth.isAuthenticated
            ? [children]
            : <Redirect to="/" />
        )}
    />
}