import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        !(localStorage.getItem("user"))
            ? <Component {...props} />
            : <Redirect to='/dashboard' />
    )} />
);

export default AuthRoute;
