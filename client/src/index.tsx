import "antd/dist/antd.css";
import "assets/css/styles.scss";
import PrivateRoute from "components/PrivateRoute";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "utils/routes";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App>
				<Routes>
					{ROUTES.map((route) => (
						<Route
							path={route.path}
							element={
								route.private ? (
									<PrivateRoute>{route.element}</PrivateRoute>
								) : (
									route.element
								)
							}
						/>
					))}
				</Routes>
			</App>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
