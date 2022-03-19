import React from "react";
import { Icons, Menu } from "components";
import { useAuth } from "hooks";
import { Link, useNavigate } from "react-router-dom";
import { Popover } from "antd";

export default function Vertical() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="h-screen w-16 bg-blue-700 flex flex-col items-center justify-between py-5 text-white">
			<Link to="/">
				<Icons.Code className="w-7 h-auto text-white hover:text-white" />
			</Link>
			<div>
				<MenuItem to="/" icon={Icons.Category} />
				<MenuItem to="/navigation" icon={Icons.Compass} />
				<MenuItem to="/chat" icon={Icons.Chat} />
				<MenuItem to="/billing" icon={Icons.Wallet} />
			</div>
			<div className="flex flex-col items-center">
				<Icons.Logout
					className="w-6 h-6 my-7 text-gray-200 hover:text-white cursor-pointer"
					style={{ marginLeft: 4 }}
					onClick={logout}
				/>
				<Popover
					placement="rightBottom"
					trigger="click"
					content={
						<Menu>
							<>
								<Menu.Item onClick={() => navigate("/profile")}>
									View Profile
								</Menu.Item>
								<Menu.Item onClick={() => navigate("/settings")}>
									Settings
								</Menu.Item>
								<Menu.Item onClick={logout}>Logout</Menu.Item>
							</>
						</Menu>
					}
					overlayInnerStyle={{ borderRadius: 7, padding: 0 }}
				>
					<img
						src="https://i.pinimg.com/280x280_RS/89/25/21/892521367eb8ad12465499931156e384.jpg"
						alt="user"
						className="rounded-full w-8 h-8 cursor-pointer"
					/>
				</Popover>
			</div>
		</div>
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
