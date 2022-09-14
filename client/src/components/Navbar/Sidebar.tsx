import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";

type Props = {
	children: any;
	title: any;
};

export default function Sidebar({ children, title }: Props) {
	return (
		<aside className="w-64 h-screen px-3 py-4 overflow-y-auto rounded bg-gray-50">
			<div className="font-semibold text-lg mb-4 ml-1.5">{title}</div>
			<div className="space-y-1.5">{children}</div>
		</aside>
	);
}

type MenuItemProps = {
	children: any;
	to?: string;
	icon?: any;
};

export const MenuItem = ({ children, icon, to }: MenuItemProps) => {
	return (
		<NavLink
			to={to ?? ""}
			className={
				"flex items-center p-2 font-normal text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer sidebar-menu-item"
			}
		>
			{icon ? <span className="mr-3">{icon}</span> : null}
			{children}
		</NavLink>
	);
};
