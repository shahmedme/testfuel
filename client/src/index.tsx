import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import Settings from "pages/settings";
import Signup from "pages/signup";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

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
									<Route path="settings/*" element={<Settings />} />
									<Route path="playground" element={<Playground />} />
									<Route path=":projectKey/*" element={<Project />} />
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
