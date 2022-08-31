import { Avatar, Tooltip } from "antd";
import { Icons, Navbar } from "components";
import { Button } from "lib";
import React from "react";
import { Link } from "react-router-dom";

export default function Releases() {
	return (
		<div>
			<Navbar.Horizontal
				title="Releases"
				extra={<Button href="new">Create new release</Button>}
			/>
			<table className="items-center w-full">
				<colgroup>
					<col span={1} style={{ width: "25%" }} />
					<col span={1} style={{ width: "15%" }} />
					<col span={1} style={{ width: "15%" }} />
					<col span={1} style={{ width: "5%" }} />
				</colgroup>
				<thead className="thead-light">
					<tr>
						<th className="py-3 text-xs font-medium text-left">Project name</th>
						<th className="py-3 text-xs font-medium text-left">Status</th>
						<th className="py-3 text-xs font-medium text-left">Team members</th>
						<th className="py-3 text-xs font-medium text-left"></th>
					</tr>
				</thead>
				<tbody>
					{_projects.map((item) => (
						<TableRow key={item.releaseId} {...item} href={item.releaseId} />
					))}
				</tbody>
			</table>
		</div>
	);
}

type TableRowProps = {
	title: string;
	subtitle: string;
	href: string;
};

const TableRow = ({ title, subtitle, href }: TableRowProps) => {
	return (
		<tr>
			<td className="align-middle py-2.5 text-left">
				<Link to={href} className="text-lg font-semibold">
					{title}
				</Link>
				<small className="block">{subtitle}</small>
			</td>
			<td className="align-middle text-sm py-2.5">
				<div className="flex items-center">
					<Tooltip
						title={<span>13 Passed &bull; 4 Failed &bull; 7 Blocked</span>}
					>
						<div className="overflow-hidden w-2/4 h-2 flex rounded">
							<div
								className="bg-green-400 h-full"
								style={{ width: "67%" }}
							></div>
							<div className="bg-red-400 h-full" style={{ width: "23%" }}></div>
							<div
								className="bg-yellow-400 h-full"
								style={{ width: "10%" }}
							></div>
						</div>
					</Tooltip>
				</div>
			</td>
			<td className="align-middle text-sm py-2.5">
				<Avatar.Group>
					{_avatars.map((avatar, idx) => (
						<Avatar key={idx} src={avatar} />
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

const _projects = [
	{
		title: "feat: added workspace",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "5682",
	},
	{
		title: "feat: new event filter",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "73",
	},
	{
		title: "ui: added app page",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "2342",
	},
	{
		title: "feat: billing and pricing",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "231525",
	},
	{
		title: "fix: chart ui update",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "5431",
	},
	{
		title: "Analytics Client",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "678",
	},
	{
		title: "Chrome Extension",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "77",
	},
	{
		title: "Year End Review",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "1234",
	},
	{
		title: "PHP Backend",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "php-backend",
	},
	{
		title: "Java Backend",
		subtitle: "TIME-1244 - Ticket title here",
		releaseId: "76833",
	},
];

const _avatars = [
	"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
	"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
	"https://t3.ftcdn.net/jpg/03/67/46/48/360_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg",
];
