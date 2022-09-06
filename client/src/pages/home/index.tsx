import { useQuery } from "@tanstack/react-query";
import { Empty, Skeleton } from "antd";
import { Navbar } from "components";
import { Button } from "lib";
import { useState } from "react";
import { storage } from "services";
import { deleteProject, fetchProjects } from "services/project";
import ProjectCreateDrawer from "./views/ProjectCreateDrawer";
import TableRow from "./views/TableRow";

export default function Home() {
	const { isLoading, data, refetch } = useQuery(["projects"], async () => {
		const workspaces = storage.get("workspaces");
		return await fetchProjects(workspaces[0]._id);
	});
	const [projectUpdateData, setProjectUpdateData] = useState<string | null>(
		null
	);

	const onDelete = async (id: string) => {
		await deleteProject(id);
		refetch();
	};

	return (
		<div className="py-7 px-9">
			<Navbar.Horizontal
				title="Projects"
				extra={
					<Button onClick={() => setProjectUpdateData("true")}>
						Create new project
					</Button>
				}
			/>

			<table className="items-center w-full border-collapse text-blueGray-700">
				<thead className="thead-light">
					<tr>
						<th className="py-3 text-xs font-medium text-left">Project name</th>
						<th className="py-3 text-xs font-medium text-left">Test runs</th>
						<th className="py-3 text-xs font-medium text-left">Team members</th>
						<th className="py-3 text-xs font-medium text-left"></th>
					</tr>
				</thead>
				<tbody>
					{!isLoading ? (
						data?.data.length ? (
							data?.data?.map((project: any) => (
								<TableRow
									key={project._id}
									slug={project._id}
									refetch={refetch}
									onDelete={onDelete}
									onEdit={setProjectUpdateData}
									{...project}
								/>
							))
						) : null
					) : (
						<tr>
							<td>
								<Skeleton />
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{data?.data.length === 0 ? (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="mt-16" />
			) : null}

			<ProjectCreateDrawer
				visible={!!projectUpdateData}
				setVisible={setProjectUpdateData}
				updateData={
					data?.data.find((project) => project._id === projectUpdateData)!
				}
				refetch={refetch}
			/>
		</div>
	);
}

export const _projects = [
	{ name: "Web Application", slug: "web-application" },
	{ name: "Backend Platform", slug: "backend-platform" },
	{ name: "Atlassin", slug: "atlassin" },
	{ name: "Demo Try", slug: "demo-try" },
	{ name: "Bitbucket", slug: "bitbucket" },
	{ name: "Analytics Client", slug: "analytics-client" },
	{ name: "Chrome Extension", slug: "chrome-extension" },
	{ name: "Year End Review", slug: "year-end-review" },
	{ name: "PHP Backend", slug: "php-backend" },
	{ name: "Java Backend", slug: "java-backend" },
];

export const _avatars = [
	"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
	"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
	"https://t3.ftcdn.net/jpg/03/67/46/48/360_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg",
];
