import { Button, Icons, Navbar } from "components";
import React from "react";

export default function Suites() {
	return (
		<div>
			<Navbar.Horizontal
				title="Suites"
				extra={<Button>View archived</Button>}
			/>
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-2 border-2 border-dashed border-blue-500 rounded-3xl p-5 h-56 flex items-center justify-center cursor-pointer">
					<Icons.Plus className="border-2 border-blue-500 text-blue-500 rounded-md w-7 h-7" />
				</div>
				{_suites.map((suite) => (
					<div className="cursor-pointer col-span-2 bg-gray-200 rounded p-5 h-56 flex flex-col justify-end">
						<h3 className="font-semibold text-lg">{suite.name}</h3>
						<small>{suite.caseCount} test cases</small>
					</div>
				))}
			</div>
		</div>
	);
}

const _suites = [
	{ name: "Dashboard", caseCount: 21 },
	{ name: "Exporter", caseCount: 56 },
	{ name: "Insight", caseCount: 33 },
	{ name: "Meeting Health", caseCount: 10 },
	{ name: "App page", caseCount: 18 },
	{ name: "Workspace", caseCount: 8 },
	{ name: "Onboarding", caseCount: 36 },
];
