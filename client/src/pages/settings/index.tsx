import {
	AdjustmentsIcon,
	BellIcon,
	CreditCardIcon,
	OfficeBuildingIcon,
	PuzzleIcon,
	ShieldCheckIcon,
	UserCircleIcon,
	UserGroupIcon,
} from "@heroicons/react/outline";
import withBeta from "components/hoc/withBeta";
import Sidebar, { MenuItem } from "components/Navbar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Billing from "./Billing";
import Developer from "./Developer";
import Integration from "./Integration";
import Members from "./Members";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Security from "./Security";
import Workspace from "./Workspace";

export default function Settings() {
	return (
		<div className="flex">
			<Sidebar title="Settings">
				{menuItems.map(({ label, isBeta, ...item }) =>
					withBeta(
						<MenuItem key={item.to} {...item}>
							{label}
						</MenuItem>,
						isBeta
					)
				)}
			</Sidebar>
			<div className="py-5 px-7 w-full">
				<Routes>
					<Route path="profile" element={<Profile />} />
					<Route path="security" element={<Security />} />
					<Route path="notifications" element={<Notifications />} />
					<Route path="integration" element={<Integration />} />
					<Route path="workspace" element={<Workspace />} />
					<Route path="members" element={<Members />} />
					<Route path="billing" element={<Billing />} />
					<Route path="developer" element={<Developer />} />
					<Route index element={<Developer />} />
				</Routes>
			</div>
		</div>
	);
}

const iconClasses = "w-6 h-6 text-gray-500";

const menuItems = [
	{
		label: "Profile",
		icon: <UserCircleIcon className={iconClasses} />,
		to: "profile",
		isBeta: true,
	},
	{
		label: "Security",
		icon: <ShieldCheckIcon className={iconClasses} />,
		to: "security",
		isBeta: true,
	},
	{
		label: "Notifications",
		icon: <BellIcon className={iconClasses} />,
		to: "notifications",
		isBeta: true,
	},
	{
		label: "Integration",
		icon: <PuzzleIcon className={iconClasses} />,
		to: "integration",
		isBeta: true,
	},
	{
		label: "Workspace",
		icon: <OfficeBuildingIcon className={iconClasses} />,
		to: "workspace",
		isBeta: true,
	},
	// {
	// 	label: "Members",
	// 	icon: <UserGroupIcon className={iconClasses} />,
	// 	to: "members",
	// 	isBeta: false,
	// },
	{
		label: "Billing",
		icon: <CreditCardIcon className={iconClasses} />,
		to: "billing",
		isBeta: true,
	},
	{
		label: "Developer",
		icon: <AdjustmentsIcon className={iconClasses} />,
		to: "developer",
		isBeta: false,
	},
];
