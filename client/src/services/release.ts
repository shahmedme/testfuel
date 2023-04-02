import { IRelase } from "types";
import { coreAxios } from "utils";

class ReleaseService {
	get = async (projectId: string) => {
		return await coreAxios.get<IRelase[]>("/release", {
			params: { project: projectId },
		});
	};

	getOne = async (releaseId: string) => {
		return await coreAxios.get<IRelase>("/release/" + releaseId);
	};

	create = async (payload: any) => {
		return await coreAxios.post<IRelase>("/release", payload);
	};

	update = async (releaseId: string, payload: any) => {
		return await coreAxios.put<IRelase>("/release/" + releaseId, payload);
	};

	delete = async (releaseId: string) => {
		return await coreAxios.delete<IRelase>("/release/" + releaseId);
	};
}

const releaseService = new ReleaseService();

export default releaseService;
