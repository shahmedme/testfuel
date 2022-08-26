import { coreAxios } from "utils";

export type SignUpPayload = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export const signup = async (values: SignUpPayload) => {
	return await coreAxios.post<SignUpPayload>("/users/signup", values);
};

export type SignInPayload = {
	email: string;
	password: string;
};

export const signin = async (values: SignInPayload) => {
	return await coreAxios.post<{ token: string }>("/users/signin", values);
};

export const fetchAccount = async () => {
	return await coreAxios.get<{ user: any; workspace: any }>("/users");
};
