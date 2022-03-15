import { Layout } from "components";
import React from "react";
import { useLocation } from "react-router-dom";
import { APP_LAYOUT_ROUTES } from "utils";

const { App: AppLayout } = Layout;

function App({ children }: { children: React.ReactElement }) {
	const { pathname } = useLocation();

	return (
		<div>
			{APP_LAYOUT_ROUTES.includes(pathname) ? (
				<AppLayout>{children}</AppLayout>
			) : (
				children
			)}
		</div>
	);
}

export default App;
