import {
	BellIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	UserCircleIcon,
} from "@heroicons/react/outline";
import { Popover } from "antd";
import classNames from "classnames";
import { Icons } from "components";
import Beta from "components/Beta";
import { ListGroup } from "flowbite-react";
import { useAuth } from "hooks";
import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "services";
import { RootState } from "store";
import { IWorkspace } from "types";
import { getAvatarFromName } from "utils/misc";
import { adjustExtraMenuPosition } from "./utils";

export default function Vertical() {
	const [popoverVisible, setPopoverVisible] = useState(false);
	const { user } = useSelector((state: RootState) => state.auth);
	const { logout } = useAuth();
	const navigate = useNavigate();

	const onPopoverMenuClick = (key: string) => () => {
		switch (key) {
			case "profile":
				navigate("/profile");
				break;
			case "settings":
				navigate("/settings");
				break;
			case "logout":
				logout();
				break;
		}

		setPopoverVisible(false);
	};

	return (
		<>
			<div className="fixed h-screen px-3.5 bg-blue-700 flex flex-col items-center justify-between py-5 text-white">
				<Link to="/">
					<Icons.Code className="w-7 h-auto text-white hover:text-white" />
				</Link>
				<div>
					<MenuItem to="/" icon={Icons.Category} />
					<Beta>
						<MenuItem to="/navigation" icon={Icons.Compass} />
						<MenuItem to="/chat" icon={Icons.Chat} />
						<MenuItem to="/billing" icon={Icons.Wallet} />
					</Beta>
				</div>

				<div className="flex flex-col items-center">
					<Beta>
						<Popover
							// visible
							placement="rightBottom"
							trigger="click"
							overlayClassName="v-menu_notification"
							content={
								<div className="w-80">
									<div className="flex items-center justify-between">
										<span className="font-medium ml-0.5">Notifications</span>
										<Link
											to="#"
											className="inline-flex items-center text-xs hover:underline"
										>
											See all
										</Link>
									</div>
									<div className="flex flex-col gap-2 mt-2">
										{NOTIFICATIONS.map((notification, idx) => (
											<NotificationItem key={idx} {...notification} />
										))}
									</div>
								</div>
							}
						>
							<BellIcon className="w-6 h-6 my-7 ml-1 text-gray-200 hover:text-white cursor-pointer" />
						</Popover>
					</Beta>
					<Popover
						visible={popoverVisible}
						placement="rightBottom"
						trigger="click"
						onVisibleChange={setPopoverVisible}
						content={
							<div className="w-52">
								<ListGroup>
									<WorkspaceSwitcher />
									<Beta>
										<ListGroup.Item onClick={onPopoverMenuClick("profile")}>
											View Profile
										</ListGroup.Item>
									</Beta>
									<ListGroup.Item onClick={onPopoverMenuClick("settings")}>
										Settings
									</ListGroup.Item>
									<ListGroup.Item onClick={onPopoverMenuClick("logout")}>
										Logout
									</ListGroup.Item>
								</ListGroup>
							</div>
						}
						overlayClassName="v-menu_extra"
						destroyTooltipOnHide={true}
					>
						<div id="v-menu-more" className="cursor-pointer">
							{user?.isBeta ? (
								<img
									src="https://cdn.pixabay.com/photo/2016/02/25/18/26/man-1222621_960_720.jpg"
									alt="user"
									className="rounded-full w-8 h-8"
								/>
							) : (
								<UserCircleIcon className="w-7 h-7" />
							)}
						</div>
					</Popover>
				</div>
			</div>
			<div className="h-screen" style={{ width: 60 }} />
		</>
	);
}

type MenuItemProps = {
	icon: any;
	to: string;
	style?: React.CSSProperties;
};

const MenuItem = ({ icon: Icon, style, to }: MenuItemProps) => {
	return (
		<Link to={to}>
			<Icon
				className="w-6 h-6 my-7 text-gray-200 hover:text-white"
				style={style}
			/>
		</Link>
	);
};

const NotificationItem = ({ title, description }: any) => {
	return (
		<div className="p-3.5 bg-white rounded border border-gray-200 shadow-sm">
			<h5 className="mb-1 text-gray-900">{title}</h5>
			<p className="mb-1.5 text-xs text-gray-500">{description}</p>
			<Link
				to="#"
				className="inline-flex items-center text-blue-600 hover:underline"
			>
				Learn more
			</Link>
		</div>
	);
};

const NOTIFICATIONS = [
	{
		title: "Preserving pull request approvals",
		description:
			"We are introducing a new premium merge condition in the repository settings",
	},
	{
		title: "More reliable merge checks",
		description:
			"We are introducing a change to the pull request merge checks that will make them more reliable",
	},
	{
		title: "Default Pull Request Tasks",
		description: "There are multiple ways to create a task on a pull request",
	},
];

const WorkspaceSwitcher = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { workspaces } = useSelector((state: RootState) => state.auth);

	const toggleWorkspaceList =
		(activeWorkspace: IWorkspace, shouldExpand: boolean) => () => {
			if (shouldExpand) {
				setIsExpanded(!isExpanded);
				adjustExtraMenuPosition(!isExpanded, workspaces?.length ?? 0);
			} else {
				storage.setAppConfig({ activeWorkspace });
				window.location.href = "/";
			}
		};

	return (
		<div className="mb-0.5 workspace-switcher">
			{isExpanded && (
				<small className="px-3 text-gray-600 font-normal">All workspaces</small>
			)}
			{workspaces
				?.slice(0, isExpanded ? workspaces.length : 1)
				.map((workspace) => (
					<div key={workspace.id} className="group">
						<ListGroup.Item
							onClick={toggleWorkspaceList(workspace, !isExpanded)}
						>
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-2">
									<img
										src={workspace.logo ?? getAvatarFromName(workspace.name)}
										alt="Workspace logo"
										className="w-6 h-6 rounded"
									/>
									<span className="font-semibold">
										{_.truncate(workspace.name, { length: 18 })}
									</span>
								</div>
								<div
									className={classNames("group-hover:block", {
										"hidden group-hover:hidden": isExpanded,
									})}
								>
									<ChevronUpIcon className="w-2.5 h-2.w-2.5 transform translate-y-0.5" />
									<ChevronDownIcon className="w-2.5 h-2.w-2.5 transform -translate-y-0.5" />
								</div>
							</div>
						</ListGroup.Item>
					</div>
				))}

			{/* {isExpanded && workspaces && workspaces?.length === 1 ? (
				<div style={{ height: 4 }} />
			) : null} */}
		</div>
	);
};
