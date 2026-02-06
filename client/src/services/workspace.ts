import { coreAxios } from "utils";

export const inviteToWorkspace = async (id: number, invitees: string[]) => {
	const payload = {
		invitee: invitees.map((invitee) => ({
			role: "ADMIN",
			email: invitee,
		})),
	};

	await coreAxios.post(`/workspace/invite/${id}`, payload);
};
