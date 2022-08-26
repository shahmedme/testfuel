export type TestT = {
	any: String;
};

export interface IProject {
	_id: string;
	name: string;
	description: string;
	isActive: boolean;
	workspace: string;
	createdAt: string;
}

export interface IWorkspace {
	_id: string;
	name: string;
	description: string;
	isActive: boolean;
	members: {
		role: string;
	};
	createdAt: string;
}
