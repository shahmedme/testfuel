import { BellIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Popover } from "antd";
import { Icons } from "components";
import Beta from "components/Beta";
import { ListGroup } from "flowbite-react";
import { useAuth } from "hooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "store";

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

				{/* jsx-1004058353 mr-3 p-1 rounded-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white */}

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
							<div className="w-48">
								<ListGroup>
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
					>
						{user?.isBeta ? (
							<img
								src="https://cdn.pixabay.com/photo/2016/02/25/18/26/man-1222621_960_720.jpg"
								alt="user"
								className="rounded-full w-8 h-8 cursor-pointer"
							/>
						) : (
							<UserCircleIcon className="w-7 h-7 cursor-pointer" />
						)}
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
