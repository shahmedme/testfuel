import classNames from "classnames";
import React from "react";

type HorizontalProps = {
	title?: React.ReactElement | string;
	extra?: React.ReactElement;
	breadcrumb?: any;
};

export default function Horizontal({
	title,
	extra,
	breadcrumb,
}: HorizontalProps) {
	return (
		<div
			className={classNames("flex justify-between mb-4", {
				"items-end": breadcrumb,
				"items-center": !breadcrumb,
			})}
		>
			<div>
				{breadcrumb}
				{title && <h2 className="text-2xl font-semibold">{title}</h2>}
			</div>
			{extra}
		</div>
	);
}
