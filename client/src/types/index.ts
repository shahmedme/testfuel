export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isBeta: boolean;
}

export interface IProject {
	id: number;
	name: string;
	description: string;
	isActive: boolean;
	workspace: string;
	createdAt: string;
}

export interface ISuite {
	id?: number;
	name: string;
	cases: ICase[];
	isArchive?: boolean;
	project?: string;
	createdAt?: string;
}

export type SuiteCreateDto = Omit<ISuite, "id" | "createdAt" | "project"> & {
	projectId: number;
};

export type SuiteUpdateDto = Partial<SuiteCreateDto> & { id: number };

export interface ICase {
	title: string;
}

export interface IWorkspace {
	id: number;
	name: string;
	description: string;
	logo: string;
	isActive: boolean;
	members: {
		role: string;
	};
	createdAt: string;
}

export interface IRelase {
	id: number;
	title: string;
	suites: ISuite[];
	project: string;
	createdAt: string;
}
