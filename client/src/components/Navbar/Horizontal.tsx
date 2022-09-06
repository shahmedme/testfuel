import classNames from "classnames";
import useBreadcrumb from "hooks/useBreadcrumb";
import React from "react";
import { Link, useLocation } from "react-router-dom";

type HorizontalProps = {
	title?: React.ReactElement | string;
	extra?: React.ReactElement;
	breadcrumb?: boolean;
};

export default function Horizontal({
	title,
	extra,
	breadcrumb,
}: HorizontalProps) {
	// const { items } = useBreadcrumb();

	return (
		<div
			className={classNames("flex justify-between mb-4", {
				"items-end": breadcrumb,
				"items-center": !breadcrumb,
			})}
		>
			<div>
				{breadcrumb && (
					<div className="text-xs mb-0.5">
						<Link to="/">Project</Link> / <Link to="/">Analytics Client</Link> /
						&nbsp;<Link to="/">Releases</Link>
					</div>
				)}
				{title && <h2 className="text-2xl font-semibold">{title}</h2>}
			</div>
			{extra}
		</div>
	);
}
