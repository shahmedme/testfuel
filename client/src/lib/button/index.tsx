import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
	children: any;
	href?: string;
	icon?: any;
	className?: string;
	onClick?: any;
};

export default function Button({
	children,
	href,
	icon,
	className: cn,
	...props
}: ButtonProps | any) {
	const className = classNames(
		"bg-blue-400 text-white font-medium px-4 py-2 rounded-lg hover:text-white flex items-center",
		{ "!bg-blue-600 hover:bg-blue-700": !props.disabled },
		cn
	);

	return (
		<>
			{href ? (
				<Link to={href} className={className} {...props}>
					{icon ? <span className="mr-1.5">{icon}</span> : null}
					{children}
				</Link>
			) : (
				<button className={className} {...props}>
					{icon ? <span className="mr-1.5">{icon}</span> : null}
					{children}
				</button>
			)}
		</>
	);
}
