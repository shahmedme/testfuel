import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { useDispatch } from "react-redux";
import { loadUser } from "store/auth";

ReactGA.initialize(process.env.REACT_APP_GA_PROPERTY_ID as any);
ReactGA.set({ page: window.location.pathname });
ReactGA.pageview(window.location.pathname + window.location.search);

function App({ children }: { children: React.ReactElement }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return <div>{children}</div>;
}

export default App;
