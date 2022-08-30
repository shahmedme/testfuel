import { IProject } from "types";
import { coreAxios } from "utils";

export const fetchProjects = async (workspace: string) => {
	return await coreAxios.get<IProject[]>("/project", {
		params: { workspace },
	});
};

export const createProject = async (payload: IProject) => {
	return await coreAxios.post<IProject>("/project", payload);
};

export const updateProject = async (id: string, payload: Partial<IProject>) => {
	return await coreAxios.put(`/project/${id}`, payload);
};

export const deleteProject = async (id: string) => {
	return await coreAxios.delete(`/project/${id}`);
};
