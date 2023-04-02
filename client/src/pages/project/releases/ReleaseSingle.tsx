import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useQuery } from "@tanstack/react-query";
import { Menu, Skeleton } from "antd";
import classNames from "classnames";
import { Icons, Navbar, Suite } from "components";
import Beta from "components/Beta";
import { Button, ContextMenu } from "lib";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import releaseService from "services/release";
import { ICase, IRelase, ISuite } from "types";

export default function ReleaseSingle() {
	const [release, _setRelease] = useState<IRelase>();
	const { releaseId }: any = useParams();
	const { data, isLoading } = useQuery(["release", releaseId], () =>
		releaseService.getOne(releaseId as string)
	);

	const setRelease = (_release: IRelase) => {
		_setRelease(_release);
		releaseService.update(releaseId, _release);
	};

	useEffect(() => {
		if (data?.data) {
			_setRelease(data.data);
		}
	}, [data]);

	const createCase = (suiteId: string | any) => (value: ICase) => {
		const _release = performOperation(
			release as any,
			suiteId,
			(_suite: ISuite) => {
				_suite.cases = [..._suite.cases, value];
			}
		);

		setRelease(_release);
	};

	const updateCase =
		(suiteId: string | any) => (idx: number, title: string) => {
			const _release = performOperation(
				release as any,
				suiteId,
				(_suite: ISuite) => {
					_suite.cases[idx].title = title;
				}
			);
			setRelease(_release);
		};

	const deleteCase = (suiteId: string | any) => (idx: number) => {
		const _release = performOperation(
			release as any,
			suiteId,
			(_suite: ISuite) => {
				_suite.cases.splice(idx, 1);
			}
		);
		setRelease(_release);
	};

	return (
		<div>
			{!isLoading ? (
				<>
					<Navbar.Horizontal
						title={data?.data.title}
						breadcrumb
						extra={
							<div className="flex items-center">
								<Beta>
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
								</Beta>
								<Button href="run" icon={<Icons.Play className="w-5 h-5" />}>
									Run Test
								</Button>
								<Beta>
									<div className="inline-block cursor-pointer">
										<ContextMenu
											trigger={["click"]}
											placement="bottomRight"
											menu={
												<Menu
													style={{ width: 150 }}
													items={[
														{
															label: <span className="ml-0.5">Edit</span>,
															key: "edit",
															icon: <PencilIcon className="w-4 h-4" />,
															onClick: () => {},
														},
														{
															label: <span className="ml-0.5">Delete</span>,
															key: "delete",
															icon: <TrashIcon className="w-4 h-4" />,
															onClick: () => {},
														},
													]}
												/>
											}
										>
											<button className="bg-gray-200 hover:bg-gray-300 ml-2 p-1.5 rounded-lg">
												<Icons.DotHorizontal />
											</button>
										</ContextMenu>
									</div>
								</Beta>
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
								{release?.suites.map((suite) => (
									<SuiteMenuItem key={suite._id} count={suite.cases.length}>
										{suite.name}
									</SuiteMenuItem>
								))}
							</div>
						</div>
						<div className="h-auto bg-gray-200 mx-2.5" style={{ width: 1 }} />
						<div className="flex-1">
							{release?.suites.map((suite, idx) => (
								<Suite
									key={idx}
									{...suite}
									onCreate={createCase(suite._id)}
									onUpdate={updateCase(suite._id)}
									onDelete={deleteCase(suite._id)}
								/>
							))}
						</div>
					</div>
				</>
			) : (
				<Skeleton />
			)}
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

const performOperation = (release: IRelase, suiteId: string, cb: any) => {
	const _release = _.cloneDeep(release);

	const _suiteIdx = _release?.suites.findIndex(
		(suite) => suite._id === suiteId
	);

	if (typeof _suiteIdx === "number" && _suiteIdx > -1) {
		const _suite = _release?.suites[_suiteIdx];

		if (_suite) {
			cb(_suite);
		}
	}

	return _release;
};
