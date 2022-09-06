import React from "react";
import { Navbar } from "components";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
	return (
		<div className="flex">
			<Navbar.Vertical />
			<div className="flex-1">
				<Outlet />
			</div>
		</div>
	);
}
