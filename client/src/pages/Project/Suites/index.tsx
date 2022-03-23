import { Button, Icons, Navbar } from "components";
import React from "react";
import { Link } from "react-router-dom";

export default function Suites() {
	return (
		<div>
			<Navbar.Horizontal
				title="Suites"
				extra={<Button href="archived">View archived</Button>}
			/>
			<div className="grid grid-cols-12 gap-6">
				<Link
					to="new"
					className="col-span-2 border-2 border-dashed border-blue-500 rounded-3xl p-5 h-56 flex items-center justify-center cursor-pointer"
				>
					<Icons.Plus className="border-2 border-blue-500 text-blue-500 rounded-md w-7 h-7" />
				</Link>
				{_suites.map((suite) => (
					<Link
						to={suite.key}
						className="col-span-2 bg-gray-200 rounded p-5 h-56 flex flex-col justify-end"
					>
						<h3 className="font-semibold text-lg">{suite.name}</h3>
						<small>{suite.caseCount} test cases</small>
					</Link>
				))}
			</div>
		</div>
	);
}

const _suites = [
	{ name: "Dashboard", key: "dashboard", caseCount: 21 },
	{ name: "Exporter", key: "exporter", caseCount: 56 },
	{ name: "Insight", key: "insight", caseCount: 33 },
	{ name: "Meeting Health", key: "meeting-health", caseCount: 10 },
	{ name: "App page", key: "app-page", caseCount: 18 },
	{ name: "Workspace", key: "workspace", caseCount: 8 },
	{ name: "Onboarding", key: "onboarding", caseCount: 36 },
];
