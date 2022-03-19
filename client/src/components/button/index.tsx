import React from "react";

export default function Button({ children }: any) {
	return (
		<button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg">
			{children}
		</button>
	);
}
