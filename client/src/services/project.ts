import { IProject } from "types";
import { coreAxios } from "utils";

export const fetchProjects = async () => {
	return await coreAxios.get<IProject[]>("/project", {
		params: { workspace: "62e34a65a7bc2916c5220e91" },
	});
};

export const createProject = async (payload: {
	name: string;
	description: string;
}) => {
	const _payload = { ...payload, workspace: "62e34a65a7bc2916c5220e91" };

	return await coreAxios.post<IProject>("/project", _payload, {
		params: { workspace: "62e34a65a7bc2916c5220e91" },
	});
};
