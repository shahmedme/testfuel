import { useAuth } from "hooks";
import React from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
	children: React.ReactElement;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
	const { user } = useAuth();

	return user ? children : <Navigate to="/login" />;
}
