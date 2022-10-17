import { Icons, Navbar, Suite } from "components";
import { Button } from "lib";
import React from "react";
import { _suites } from "./ReleaseSingle";

export default function ReleaseRun() {
	return (
		<div>
			<Navbar.Horizontal
				title="TIME-1790"
				breadcrumb
				extra={
					<div className="flex items-center">
						<span className="mr-3.5 text-xs">
							13 Passed &bull; 4 Failed &bull; 7 Blocked
						</span>
						<div className="overflow-hidden w-40 h-2 flex rounded">
							<div
								className="bg-green-400 h-full"
								style={{ width: "67%" }}
							></div>
							<div className="bg-red-400 h-full" style={{ width: "23%" }}></div>
							<div
								className="bg-yellow-400 h-full"
								style={{ width: "10%" }}
							></div>
						</div>
					</div>
				}
			/>
			<div
				className="grid grid-cols-12 gap-6 mt-8"
				style={{ height: "calc(100vh - 140px)" }}
			>
				<div className="col-span-9">
					{_suites.map((suite, idx) => (
						<Suite key={idx} {...suite} />
					))}
				</div>
				<div className="col-span-3 bg-slate-100 h-full overflow-y-auto rounded-lg p-5">
					<h3 className="font-semibold text-lg mb-3">Authorization</h3>
					<div className="grid grid-cols-3 gap-1 mb-7">
						<Button
							icon={<Icons.Check className="w-4 h-4 -mt-0.5" />}
							className="col-span-1 text-sm !bg-green-400 hover:!bg-green-500"
						>
							Passed
						</Button>
						<Button
							icon={<Icons.Cross className="w-4 h-4 -mt-0.5" />}
							className="col-span-1 text-sm !bg-red-400 hover:!bg-red-500"
						>
							Failed
						</Button>
						<Button
							icon={<Icons.Warning className="w-4 h-4 -mt-0.5" />}
							className="col-span-1 text-sm !bg-yellow-400 hover:!bg-yellow-500"
						>
							Blocked
						</Button>
					</div>
					<textarea
						placeholder="Comment here"
						rows={5}
						className="border border-gray-200 focus:border-gray-300 w-full mb-7 bg-white p-3 rounded-lg text-sm focus:outline-none placeholder:text-xs"
						style={{ minHeight: 126 }}
					></textarea>
					<div className="mb-5">
						<h4 className="font-semibold text-sm mb-1">Case Description</h4>
						<p>
							This suite contains suites for the repository, steps, milestones,
							plans, runs, and defects.
						</p>
					</div>
					<div>
						<h4 className="font-semibold text-sm mb-1">Steps to reproduce</h4>
						<ul className="list-decimal pl-4 text-sm">
							<li>
								Open projects page and click on menu button on the right from
								project name in a row.
							</li>
							<li>Click on "Delete" element in a dropdown menu.</li>
							<li>Click on "Delete project" button.</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
