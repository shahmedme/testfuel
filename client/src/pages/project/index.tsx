import { BookmarkAltIcon, ViewBoardsIcon } from "@heroicons/react/outline";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { Icons } from "components";
import Beta from "components/Beta";
import { Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import { fetchProject } from "services/project";
import Members from "./Members";
import Releases from "./releases";
import NewRelease from "./releases/New";
import ReleaseRun from "./releases/ReleaseRun";
import ReleaseSingle from "./releases/ReleaseSingle";
import Settings from "./Settings";
import Suites from "./suites";
import SuiteArchived from "./suites/archived";
import SuiteDetails from "./suites/details";
import SuiteNew from "./suites/new";

export default function Project() {
	const { projectKey } = useParams();
	const { isLoading, data } = useQuery(
		["project", projectKey],
		async () => await fetchProject(projectKey!)
	);

	return (
		<div className="flex">
			<div className="bg-slate-100 h-screen fixed w-60 py-6 px-4">
				<h2 className="font-semibold text-lg pl-2.5">
					{!isLoading ? (
						data?.data.name
					) : (
						<Skeleton.Button block={true} style={{ height: 28 }} />
					)}
				</h2>

				<div className="mt-7">
					{_menuItems.map((item) => (
						<span key={item.key}>
							{item.beta ? (
								<Beta>
									<MenuItem to={item.key} {...item} key={item.key}>
										{item.label}
									</MenuItem>
								</Beta>
							) : (
								<MenuItem to={item.key} {...item} key={item.key}>
									{item.label}
								</MenuItem>
							)}
						</span>
					))}
				</div>
			</div>

			<div style={{ width: 240, height: "100vh" }} />

			<div className="flex-1 py-7 px-9">
				<Routes>
					<Route path="releases">
						<Route index element={<Releases />} />
						<Route path="new" element={<NewRelease />} />
						<Route path=":releaseId">
							<Route index element={<ReleaseSingle />} />
							<Route path="run" element={<ReleaseRun />} />
						</Route>
					</Route>
					<Route path="members" element={<Members />} />
					<Route path="settings" element={<Settings />} />
					<Route path="suites">
						<Route index element={<Suites project={data?.data} />} />
						<Route path=":suiteId" element={<SuiteDetails />} />
						<Route path="new" element={<SuiteNew />} />
						<Route path="archived" element={<SuiteArchived />} />
					</Route>
					<Route index element={<Navigate replace to="suites" />} />
				</Routes>
			</div>
		</div>
	);
}

const _menuItems = [
	{
		key: "releases",
		label: "Releases",
		icon: <Icons.Collection />,
		beta: true,
	},
	{ key: "suites", label: "Suites", icon: <Icons.Briefcase />, beta: false },
	{
		key: "issues",
		label: "Issues",
		icon: <ViewBoardsIcon className="w-6 h-6" />,
		beta: true,
	},
	{
		key: "shortcuts",
		label: "Shortcuts",
		icon: <BookmarkAltIcon className="w-6 h-6" />,
		beta: true,
	},
	{ key: "members", label: "Members", icon: <Icons.Users />, beta: true },
	{ key: "settings", label: "Settings", icon: <Icons.Cog />, beta: true },
];

type MenuItemProps = {
	children: any;
	icon: any;
	to: string;
};

const MenuItem = ({ children, icon, to }: MenuItemProps) => {
	return (
		<NavLink
			to={to}
			className="flex items-center cursor-pointer py-2 my-0.5 rounded-md px-2.5 project-menu-item"
		>
			<span className="mr-1.5">{icon}</span>
			{children}
		</NavLink>
	);
};
