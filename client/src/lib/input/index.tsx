import React from "react";
import classNames from "classnames";

export default function Input({ label, className, ...props }: any) {
	return (
		<div>
			{label && (
				<label
					htmlFor={label.htmlFor}
					className="text-sm font-medium text-gray-900 block mb-2 "
				>
					{label.text}
				</label>
			)}
			{props.type === "textarea" ? (
				<textarea
					className={classNames(classes, className)}
					{...props}
				></textarea>
			) : props.type === "select" ? (
				<select className={classNames(classes, className)} {...props}>
					{props.children}
				</select>
			) : (
				<input className={classNames(classes, className)} {...props} />
			)}
		</div>
	);
}

export const classes =
	"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
