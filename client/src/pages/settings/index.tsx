import {
	AdjustmentsIcon,
	BellIcon,
	CreditCardIcon,
	OfficeBuildingIcon,
	PuzzleIcon,
	ShieldCheckIcon,
	UserCircleIcon,
} from "@heroicons/react/outline";
import Beta from "components/Beta";
import Sidebar, { MenuItem } from "components/Navbar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Billing from "./Billing";
import Developer from "./Developer";
import Integration from "./Integration";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Security from "./Security";
import Workspace from "./Workspace";

export default function Settings() {
	return (
		<div className="flex">
			<Sidebar title="Settings">
				<Beta>
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
				</Beta>

				<MenuItem
					to="developer"
					icon={<AdjustmentsIcon className={iconClasses} />}
				>
					Developer
				</MenuItem>
			</Sidebar>
			<div className="py-5 px-7 w-full">
				<Routes>
					<Route path="profile" element={<Profile />} />
					<Route path="security" element={<Security />} />
					<Route path="notifications" element={<Notifications />} />
					<Route path="integration" element={<Integration />} />
					<Route path="workspace" element={<Workspace />} />
					<Route path="billing" element={<Billing />} />
					<Route path="developer" element={<Developer />} />
					<Route index element={<Developer />} />
				</Routes>
			</div>
		</div>
	);
}

const iconClasses = "w-6 h-6 text-gray-500";
