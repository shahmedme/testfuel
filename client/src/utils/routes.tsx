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
import Suites from "pages/Project/Suites";
import Settings from "pages/Settings";

export const ROUTES = [
	{ path: "/", element: <Home />, private: true },
	{ path: "/login", element: <Login />, private: false },
	{ path: "/playground", element: <Playground />, private: true },
	{ path: "/navigation", element: <Navigation />, private: true },
	{ path: "/chat", element: <Chat />, private: true },
	{ path: "/billing", element: <Billing />, private: true },
	{ path: "/profile", element: <Profile />, private: true },
	{ path: "/settings", element: <Settings />, private: true },
	{
		path: "/p/:projectKey",
		element: <Project />,
		private: true,
		nested: [
			{
				index: true,
				path: "releases",
				element: <Releases />,
				nested: [{ index: true, path: "new", element: <NewRelease /> }],
			},
			{ path: "suites", element: <Suites /> },
			{ path: "members", element: <Members /> },
			{ path: "settings", element: <Settings /> },
		],
	},
	{ path: "*", element: <NotFound /> },
];
