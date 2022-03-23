import "antd/dist/antd.css";
import "assets/css/styles.scss";
import PrivateRoute from "components/PrivateRoute";
import NotFound from "pages/404";
import Billing from "pages/Billing";
import Chat from "pages/Chat";
import Home from "pages/Home";
import Login from "pages/Login";
import Navigation from "pages/Navigation";
import Playground from "pages/Playground";
import Profile from "pages/Profile";
import Project from "pages/Project";
import Members from "pages/Project/Members";
import Releases from "pages/Project/Releases";
import NewRelease from "pages/Project/Releases/New";
import ReleaseRun from "pages/Project/Releases/ReleaseRun";
import ReleaseSingle from "pages/Project/Releases/ReleaseSingle";
import { default as ProjectSettings } from "pages/Project/Settings";
import Suites from "pages/Project/Suites";
import SuiteArchived from "pages/Project/Suites/Archived";
import SuiteDetails from "pages/Project/Suites/Details";
import SuiteNew from "pages/Project/Suites/New";
import Settings from "pages/Settings";
import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App>
				<Routes>
					<Route path="/" element={<PrivateRoute />}>
						<Route index element={<Home />} />
						<Route path="navigation" element={<Navigation />} />
						<Route path="chat" element={<Chat />} />
						<Route path="billing" element={<Billing />} />
						<Route path="profile" element={<Profile />} />
						<Route path="p/:projectKey" element={<Project />}>
							<Route
								path="/p/:projectKey"
								element={<Navigate replace to="releases" />}
							/>
							<Route path="releases">
								<Route index element={<Releases />} />
								<Route path="new" element={<NewRelease />} />
								<Route path=":releaseId">
									<Route index element={<ReleaseSingle />} />
									<Route path="run" element={<ReleaseRun />} />
								</Route>
							</Route>
							<Route path="suites">
								<Route index element={<Suites />} />
								<Route path=":suiteId" element={<SuiteDetails />} />
								<Route path="new" element={<SuiteNew />} />
								<Route path="archived" element={<SuiteArchived />} />
							</Route>
							<Route path="members" element={<Members />} />
							<Route path="settings" element={<ProjectSettings />} />
						</Route>
						<Route path="settings" element={<Settings />} />
						<Route path="playground" element={<Playground />} />
					</Route>
					<Route>
						<Route path="login" element={<Login />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</App>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
