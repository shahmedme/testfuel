import { useAuth } from "hooks";
import React from "react";

export default function Playground() {
	const { logout } = useAuth();

	return (
		<div>
			<button onClick={logout}>Logout</button>
		</div>
	);
}
