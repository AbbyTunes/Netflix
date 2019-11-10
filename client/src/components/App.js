import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./user_auth/Login";
import Register from "./user_auth/Register";
import Nav from "./nav/Nav";
import Profile from "./user/Profile"
import Settings from "./user/Settings";

import "./App.css";

const App = () => {
	return (
		<div>
			<Nav />
			<Switch>
        {/* debug buttons */}
				<AuthRoute exact path="/login" component={Login} routeType="auth" />
				<AuthRoute exact path="/register" component={Register} routeType="auth" />
				{/* <Route exact path="/arts" component={Art} /> */}
				{/* <Route exact path="/cart" component={Cart} /> */}
			</Switch>
			<Route exact path="/users/:userId" component={Profile} />
			<Route exact path="/settings" component={Settings} />
		</div>
	);
};

export default App;
