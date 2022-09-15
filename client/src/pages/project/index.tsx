import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import classNames from "classnames";
import { Icons } from "components";
import Beta from "components/Beta";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { fetchProject } from "services/project";

export default function Project() {
	const { projectKey } = useParams();
	const { isLoading, data } = useQuery(
		["project", projectKey],
		async () => await fetchProject(projectKey!)
	);
	const [activeKey, setActiveKey] = useState("releases");
	const navigate = useNavigate();

	return (
		<div className="flex">
			<div className="bg-slate-100 h-screen w-60 py-6 px-4">
				<h2 className="font-semibold text-lg pl-2.5">
					{!isLoading ? (
						data?.data.name
					) : (
						<Skeleton.Button block={true} style={{ height: 28 }} />
					)}
				</h2>
				<div className="mt-7">
					{_menuItems.map((item) =>
						item.beta ? (
							<Beta>
								<MenuItem
									{...item}
									key={item.key}
									active={activeKey === item.key}
									onClick={() => {
										setActiveKey(item.key);
										navigate(`/p/${projectKey}/${item.key}`);
									}}
								>
									{item.label}
								</MenuItem>
							</Beta>
						) : (
							<MenuItem
								{...item}
								key={item.key}
								active={activeKey === item.key}
								onClick={() => {
									setActiveKey(item.key);
									navigate(`/p/${projectKey}/${item.key}`);
								}}
							>
								{item.label}
							</MenuItem>
						)
					)}
				</div>
			</div>

			<div className="flex-1 py-7 px-9">
				<Outlet />
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
	{ key: "members", label: "Members", icon: <Icons.Users />, beta: true },
	{ key: "settings", label: "Settings", icon: <Icons.Cog />, beta: true },
];

type MenuItemProps = {
	children: any;
	icon: any;
	active: boolean;
	onClick: any;
};

const MenuItem = ({ children, icon, active, onClick }: MenuItemProps) => {
	return (
		<div
			className={classNames(
				"flex items-center cursor-pointer py-2 my-0.5 rounded-md px-2.5",
				{
					"text-white bg-blue-600": active,
				}
			)}
			onClick={onClick}
		>
			<span className="mr-1.5">{icon}</span>
			{children}
		</div>
	);
};
