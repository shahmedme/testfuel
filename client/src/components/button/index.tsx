import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
	children: any;
	href?: string;
	icon?: any;
	className?: string;
};

export default function Button({
	children,
	href,
	icon,
	className: cn,
}: ButtonProps) {
	const className = classNames(
		"bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg hover:text-white flex items-center",
		cn
	);

	return (
		<>
			{href ? (
				<Link to={href} className={className}>
					{icon ? <span className="mr-1.5">{icon}</span> : null}
					{children}
				</Link>
			) : (
				<button className={className}>
					{icon ? <span className="mr-1.5">{icon}</span> : null}
					{children}
				</button>
			)}
		</>
	);
}
