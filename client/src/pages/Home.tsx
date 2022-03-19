import { Avatar } from "antd";
import { Button, Icons, Navbar } from "components";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="py-7 px-9">
			<Navbar.Horizontal
				title="Projects"
				extra={<Button>Create new project</Button>}
			/>
			<table className="items-center w-full border-collapse text-blueGray-700">
				<thead className="thead-light">
					<th className="py-3 text-xs font-medium text-left">Project name</th>
					<th className="py-3 text-xs font-medium text-left">Test runs</th>
					<th className="py-3 text-xs font-medium text-left">Team members</th>
					<th className="py-3 text-xs font-medium text-left"></th>
				</thead>
				<tbody>
					{_projects.map((item) => (
						<TableRow key={item.slug} {...item} />
					))}
				</tbody>
			</table>
		</div>
	);
}

type TableRowProps = {
	name: string;
	slug: string;
};

const TableRow = ({ name, slug }: TableRowProps) => {
	return (
		<tr>
			<td className="align-middle py-2.5 text-left">
				<Link to={`/project/${slug}`} className="text-lg font-semibold">
					{name}
				</Link>
				<small className="block">
					52 test cases | 21 suites | 29 active runs
				</small>
			</td>
			<td className="align-middle text-sm py-2.5 text-blue-600">
				42 test runs
			</td>
			<td className="align-middle text-sm py-2.5">
				<Avatar.Group>
					{_avatars.map((avatar) => (
						<Avatar src={avatar} />
					))}
				</Avatar.Group>
			</td>
			<td className="align-middle text-base text-right py-2.5">
				<div className="inline-block cursor-pointer">
					<Icons.DotHorizontal />
				</div>
			</td>
		</tr>
	);
};

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

const _avatars = [
	"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
	"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
	"https://bombaymeatco.com/wp-content/uploads/2014/11/free-profile-photo-whatsapp-4.png",
];
