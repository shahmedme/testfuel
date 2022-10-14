import classNames from "classnames";
import React from "react";

type HorizontalProps = {
	title?: React.ReactElement | string;
	extra?: React.ReactElement | null;
	breadcrumb?: any;
	className?: string;
};

export default function Horizontal({
	title,
	extra,
	breadcrumb,
	className,
}: HorizontalProps) {
	return (
		<div
			className={classNames(
				"flex justify-between mb-4",
				{
					"items-end": breadcrumb,
					"items-center": !breadcrumb,
				},
				className
			)}
		>
			<div>
				{breadcrumb}
				{title && <h2 className="text-2xl font-semibold">{title}</h2>}
			</div>
			{extra}
		</div>
	);
}
