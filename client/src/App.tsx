import { Layout } from "components";
import React from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_LAYOUT_ROUTES } from "utils";

const { App: AppLayout } = Layout;

function App({ children }: { children: React.ReactElement }) {
	const { pathname } = useLocation();

	return (
		<div>
			{DEFAULT_LAYOUT_ROUTES.includes(pathname) ? (
				children
			) : (
				<AppLayout>{children}</AppLayout>
			)}
		</div>
	);
}

export default App;
