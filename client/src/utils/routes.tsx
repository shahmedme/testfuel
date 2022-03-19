import Billing from "pages/Billing";
import Chat from "pages/Chat";
import Home from "pages/Home";
import Login from "pages/Login";
import Navigation from "pages/Navigation";
import Playground from "pages/Playground";
import Profile from "pages/Profile";
import Project from "pages/Project";
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
	{ path: "/project/:slug", element: <Project />, private: true },
];
