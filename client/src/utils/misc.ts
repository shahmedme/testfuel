import { PALETTE } from "./constants";

export const generateBreadcrumb = (pathname: string) => {
	return pathname.split("/");
};

export const getAvatarFromName = (name: string) => {
	const color =
		PALETTE["abcdefghijklmnopqrstuvwxyz".indexOf(name[0].toLowerCase())];

	return `https://ui-avatars.com/api/?name=${name}&background=${color.substr(
		1,
		color.length
	)}&length=1&bold=true&color=fff`;
};

export const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
