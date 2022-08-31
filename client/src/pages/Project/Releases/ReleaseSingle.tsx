import classNames from "classnames";
import { Icons, Navbar } from "components";
import { Button } from "lib";
import React from "react";

export default function ReleaseSingle() {
	return (
		<div>
			<Navbar.Horizontal
				title="TIME-1790"
				breadcrumb
				extra={
					<div className="flex items-center">
						<div className="relative mx-auto text-gray-600 mr-2">
							<input
								className="border-2 border-gray-200 bg-white h-9 pl-3 rounded-lg text-sm focus:outline-none placeholder:text-xs"
								type="search"
								name="search"
								placeholder="Search for cases"
							/>
							<div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
								<Icons.Search className="w-4 h-4" />
							</div>
						</div>
						<Button href="run" icon={<Icons.Play className="w-5 h-5" />}>
							Run Test
						</Button>
						<button className="bg-gray-200 hover:bg-gray-300 ml-2 p-1.5 rounded-lg">
							<Icons.DotHorizontal />
						</button>
					</div>
				}
			/>
			<div className="flex mt-8">
				<div className="w-64">
					<h4 className="font-semibold text-lg flex items-center">
						<Icons.List className="w-4 h-4 mr-1 -mt-0.5" />
						Suites
					</h4>
					<div className="mt-2">
						<SuiteMenuItem active count="4">
							Dashboard
						</SuiteMenuItem>
						<SuiteMenuItem count="11">Exporter</SuiteMenuItem>
						<SuiteMenuItem count="9">Insight</SuiteMenuItem>
					</div>
				</div>
				<div className="h-auto bg-gray-200 mx-2.5" style={{ width: 1 }} />
				<div className="flex-1">
					{_suites.map((suite, idx) => (
						<SuiteAccordion key={idx} {...suite} />
					))}
				</div>
			</div>
		</div>
	);
}

const SuiteMenuItem = ({ children, active, count }: any) => {
	return (
		<div
			className={classNames(
				"py-1 px-2 rounded hover:bg-gray-100 cursor-pointer my-0.5 font-medium text-gray-600 flex items-center justify-between",
				{ "bg-gray-100": active }
			)}
		>
			{children}
			<span className="font-semibold bg-gray-200 p-0.5 text-xs rounded">
				{count}
			</span>
		</div>
	);
};

type SuiteAccordionProps = {
	title?: string;
	cases: any[];
};

export const SuiteAccordion = ({ title, cases }: SuiteAccordionProps) => {
	return (
		<div className="mb-1">
			{title ? (
				<div className="flex items-center bg-gray-100 rounded px-2.5 py-1 group">
					<h3 className="font-semibold text-base">{title}</h3>
					<div className="ml-7 flex items-center text-gray-500">
						<Icons.Pen className="w-4 h-4 mr-3 cursor-pointer" />
						<Icons.Trash className="w-4 h-4 cursor-pointer" />
					</div>
				</div>
			) : null}
			<div className="ml-4 pt-2 pb-4">
				{cases.map((_case, idx) => (
					<div key={idx} className="border-b py-1 flex items-center">
						<Icons.ArrowUp className="w-3 h-3 mr-2 text-red-500" />{" "}
						{_case.title}
					</div>
				))}
				<div className="flex items-center mt-2.5">
					<Icons.Plus className="text-gray-300 w-5 h-5 -mt-0.5 mr-0.5" />
					<input
						type="text"
						placeholder="Create quick test"
						className="py-0.5 focus:outline-none border-0 focus:ring-0 w-full"
					/>
				</div>
			</div>
		</div>
	);
};

export const _suites = [
	{
		title: "Dashboard",
		cases: [
			{ title: "Authorization" },
			{ title: "Sign up" },
			{ title: "Password restore" },
		],
	},
	{
		title: "Exporter",
		cases: [
			{ title: "Edit existing project" },
			{ title: "Delete project" },
			{ title: "Create new project" },
		],
	},
];
