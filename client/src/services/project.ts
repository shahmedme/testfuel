import { IProject } from "types";
import { coreAxios } from "utils";

export const fetchProjects = async (workspace: string) => {
	return await coreAxios.get<IProject[]>("/project", {
		params: { workspace },
	});
};

export const createProject = async (payload: {
	name: string;
	description: string;
	workspace: string;
}) => {
	return await coreAxios.post<IProject>("/project", payload);
};
