import "antd/dist/antd.css";
import "assets/css/styles.scss";
import { Layout } from "components";
import PrivateRoute from "components/PrivateRoute";
import NotFound from "pages/404";
import Billing from "pages/billing";
import Chat from "pages/chat";
import Home from "pages/home";
import Login from "pages/login";
import Navigation from "pages/navigation";
import Playground from "pages/playground";
import Profile from "pages/profile";
import Project from "pages/project";
import Members from "pages/project/Members";
import Releases from "pages/project/releases";
import NewRelease from "pages/project/releases/New";
import ReleaseRun from "pages/project/releases/ReleaseRun";
import ReleaseSingle from "pages/project/releases/ReleaseSingle";
import { default as ProjectSettings } from "pages/project/Settings";
import Suites from "pages/project/suites";
import SuiteArchived from "pages/project/suites/archived";
import SuiteDetails from "pages/project/suites/details";
import SuiteNew from "pages/project/suites/new";
import Signup from "pages/signup";
import Settings from "pages/settings";
import React from "react";
import ReactDOM from "react-dom/client";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "store";

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const container = document.getElementById("root");
// @ts-ignore
const root = ReactDOM.createRoot(container);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Router>
					<App>
						<Routes>
							<Route path="/" element={<PrivateRoute />}>
								<Route element={<Layout.App />}>
									<Route index element={<Home />} />
									<Route path="navigation" element={<Navigation />} />
									<Route path="chat" element={<Chat />} />
									<Route path="billing" element={<Billing />} />
									<Route path="profile" element={<Profile />} />
									<Route path="p/:projectKey" element={<Project />}>
										<Route
											path="/p/:projectKey"
											element={<Navigate replace to="suites" />}
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
									<Route path="settings/*" element={<Settings />} />
									<Route path="playground" element={<Playground />} />
								</Route>
							</Route>
							<Route>
								<Route path="login" element={<Login />} />
								<Route path="join" element={<Signup />} />
							</Route>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</App>
				</Router>
			</QueryClientProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
