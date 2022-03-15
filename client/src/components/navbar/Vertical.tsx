import React from "react";
import { Icons } from "components";
import { useAuth } from "hooks";
import { Link } from "react-router-dom";

export default function Vertical() {
	const { logout } = useAuth();

	return (
		<div className="h-screen w-14 bg-blue-700 flex flex-col items-center justify-between py-5 text-white">
			<Link to="/">
				<Icons.Code className="w-7 h-auto" />
			</Link>
			<div>
				<MenuItem icon={Icons.Category} />
				<MenuItem icon={Icons.Compass} />
				<MenuItem icon={Icons.Chat} />
				<MenuItem icon={Icons.Wallet} />
			</div>
			<div className="flex flex-col items-center">
				<MenuItem
					icon={Icons.Logout}
					style={{ marginLeft: 4 }}
					onClick={logout}
				/>
				<img
					src="https://i.pinimg.com/280x280_RS/89/25/21/892521367eb8ad12465499931156e384.jpg"
					alt="user"
					className="rounded-full w-8 h-8"
				/>
			</div>
		</div>
	);
}

type MenuItemProps = {
	icon: any;
	onClick?: Function;
	style?: React.CSSProperties;
};

const MenuItem = ({ icon: Icon, onClick, style }: MenuItemProps) => {
	return (
		<div className="cursor-pointer">
			<Icon
				className="w-6 h-6 my-7 text-gray-200 hover:text-white"
				onClick={onClick}
				style={style}
			/>
		</div>
	);
};
