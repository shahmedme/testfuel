import React from "react";

type HorizontalProps = {
	title: React.ReactElement | string;
	extra?: React.ReactElement;
};

export default function Horizontal({ title, extra }: HorizontalProps) {
	return (
		<div className="flex items-center justify-between mb-4">
			<h2 className="text-2xl font-semibold">{title}</h2>
			{extra}
		</div>
	);
}
