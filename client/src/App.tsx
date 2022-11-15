import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import { useDispatch } from "react-redux";
import { loadUser } from "store/auth";

ReactGA.initialize(process.env.REACT_APP_GA_PROPERTY_ID as string);
ReactGA.send("pageview");

function App({ children }: { children: React.ReactElement }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return <div>{children}</div>;
}

export default App;
