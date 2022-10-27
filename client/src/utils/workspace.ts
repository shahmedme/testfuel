import { storage } from "services";
import { IWorkspace } from "types";

export const getActiveWorkspace = (): IWorkspace => {
	const activeWorkspace = storage.getAppConfig("activeWorkspace");

	if (activeWorkspace) {
		return activeWorkspace;
	}

	return storage.get("workspaces")?.[0];
};
