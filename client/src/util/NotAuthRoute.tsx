//@ts-nocheck
import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../util/auth';

//PAra que no deje registrarnos o logearnos ya estando logea2
function AuthRouteUsers({ component: Component, ...rest}) {
	const {user} = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={props => 
				!user ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	)
}

export default AuthRouteUsers;