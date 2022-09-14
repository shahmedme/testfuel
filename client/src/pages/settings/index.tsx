import {
	AdjustmentsIcon,
	BellIcon,
	CreditCardIcon,
	OfficeBuildingIcon,
	PuzzleIcon,
	ShieldCheckIcon,
	UserCircleIcon,
} from "@heroicons/react/outline";
import Sidebar, { MenuItem } from "components/Navbar/Sidebar";
import { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Profile";

export default function Settings() {
	const navigate = useNavigate();

	useEffect(() => navigate("profile"), []);

	return (
		<div className="flex">
			<Sidebar title="Settings">
				<MenuItem
					to="profile"
					icon={<UserCircleIcon className={iconClasses} />}
				>
					Profile
				</MenuItem>
				<MenuItem
					to="security"
					icon={<ShieldCheckIcon className={iconClasses} />}
				>
					Security
				</MenuItem>
				<MenuItem
					to="notifications"
					icon={<BellIcon className={iconClasses} />}
				>
					Notifications
				</MenuItem>
				<MenuItem
					to="integration"
					icon={<PuzzleIcon className={iconClasses} />}
				>
					Integration
				</MenuItem>
				<MenuItem
					to="workspace"
					icon={<OfficeBuildingIcon className={iconClasses} />}
				>
					Workspace
				</MenuItem>
				<MenuItem
					to="billing"
					icon={<CreditCardIcon className={iconClasses} />}
				>
					Billing
				</MenuItem>
				<MenuItem
					to="developer"
					icon={<AdjustmentsIcon className={iconClasses} />}
				>
					Developer
				</MenuItem>
			</Sidebar>
			<div className="p-4">
				<Routes>
					<Route path="profile" element={<Profile />} />
					<Route path="profile" element={<Profile />} />
					<Route path="profile" element={<Profile />} />
					<Route path="profile" element={<Profile />} />
					<Route path="profile" element={<Profile />} />
				</Routes>
			</div>
		</div>
	);
}

const iconClasses = "w-6 h-6 text-gray-500";
