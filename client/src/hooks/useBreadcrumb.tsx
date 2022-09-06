import { useLocation } from "react-router-dom";

export default function useBreadcrumb() {
	const location = useLocation();
	// @ts-ignore
	const items = location.pathname
		.split("/")
		.map((item) => ({ label: item, href: item }));

	return {
		items,
	};
}
