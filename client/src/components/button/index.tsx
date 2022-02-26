import React from "react";

export default function Button({ children }: any) {
	return (
		<button className="bg-blue-500 text-white px-4 py-2 rounded m-10">
			{children}
		</button>
	);
}
