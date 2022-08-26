import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "store/auth";

function App({ children }: { children: React.ReactElement }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return <div>{children}</div>;
}

export default App;
