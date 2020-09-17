import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {AUTH_TOKEN} from "../constants";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        { ...rest }
        render={ props =>
            sessionStorage.getItem(AUTH_TOKEN) ? (
                <Component { ...props } />
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
            )
        }
    />
);

export default PrivateRoute