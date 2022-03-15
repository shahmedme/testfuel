import React from "react";
import { Navbar } from "components";

type AppLayoutProps = {
	children: React.ReactElement;
};

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<div className="flex">
			<Navbar.Vertical />
			<div className="p-8 flex-1">{children}</div>
		</div>
	);
}
