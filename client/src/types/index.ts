export interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isBeta: boolean;
}

export interface IProject {
	_id: string;
	name: string;
	description: string;
	isActive: boolean;
	workspace: string;
	createdAt: string;
}

export interface ISuite {
	_id?: string;
	name: string;
	cases: ICase[];
	isArchive: boolean;
	project?: string;
	createdAt?: string;
}

export interface ICase {
	title: string;
}

export interface IWorkspace {
	_id: string;
	name: string;
	description: string;
	logo: string;
	isActive: boolean;
	members: {
		role: string;
	};
	createdAt: string;
}
