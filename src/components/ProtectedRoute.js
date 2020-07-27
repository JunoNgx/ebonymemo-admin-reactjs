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

// export default function ProtectedRoute({children, ...rest}) {
//     return (
//         <AuthConsumer>
//             {({ isAuth }) => (
//                 <Route
//                     render={props =>
//                     isAuth ? {children} : <Redirect to="/" />
//                     }
//                     {...rest}
//                 />
//             )}
//         </AuthConsumer>
//     )
// }
// export default function ProtectedRoute({children, ...rest}) {
//     return (
//         <AuthConsumer>
//             {isAuthenticated => {
//                 <Route {...rest} render={() => {
//                     (isAuthenticated)
//                     ? {children}
//                     : <Redirect to="/"/>
//                         }
//                     }
//                 />
//             }}
//         </AuthConsumer>
//     )
// }