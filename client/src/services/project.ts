import { IProject, ISuite, SuiteCreateDto, SuiteUpdateDto } from "types";
import { coreAxios } from "utils";

export const fetchProjects = async (workspace: string) => {
	return await coreAxios.get<IProject[]>("/project", {
		params: { workspace },
	});
};

export const fetchProject = async (id: string) => {
	return await coreAxios.get<IProject>(`/project/${id}`);
};

export const createProject = async (payload: IProject) => {
	return await coreAxios.post<IProject>("/project", payload);
};

export const updateProject = async (id: number, payload: Partial<IProject>) => {
	return await coreAxios.put(`/project/${id}`, payload);
};

export const deleteProject = async (id: string) => {
	return await coreAxios.delete(`/project/${id}`);
};

export const fetchSuites = async (project: string) => {
	return await coreAxios.get<ISuite[]>("/suite", {
		params: { project },
	});
};

export const fetchSuite = async (id: string) => {
	return await coreAxios.get<ISuite>(`/suite/${id}`);
};

export const createSuite = async (payload: SuiteCreateDto) => {
	return await coreAxios.post<ISuite>("/suite", payload);
};

export const updateSuite = async ({ id, ...payload }: SuiteUpdateDto) => {
	return await coreAxios.put<ISuite>(`/suite/${id}`, payload);
};

export const deleteSuite = async (id: number) => {
	return await coreAxios.delete(`/suite/${id}`);
};
