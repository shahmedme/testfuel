import "assets/css/styles.scss";
import PrivateRoute from "components/PrivateRoute";
import Home from "pages/Home";
import Login from "pages/Login";
import Playground from "pages/Playground";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route
						path="/playground"
						element={
							<PrivateRoute>
								<Playground />
							</PrivateRoute>
						}
					/>
				</Routes>
			</App>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
