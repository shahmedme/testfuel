import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useMutation } from "@tanstack/react-query";
import { Menu } from "antd";
import { Icons, Navbar, Suite } from "components";
import { Spinner } from "flowbite-react";
import { Button, ContextMenu } from "lib";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { createSuite, deleteSuite, updateSuite } from "services/project";
import { ICase, ISuite } from "types";
import _ from "lodash";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const DynamicBreadcrumb = ({ name }: any) => <span>{name}</span>;

export default function SuiteNew({ suite }: { suite?: ISuite }) {
	const [name, setName] = useState("");
	const [cases, setCases] = useState<ICase[]>([]);
	const suiteHandler = useMutation(createSuite);
	const suiteUpdateHandler = useMutation(updateSuite);
	const { projectKey } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const routes = [
		{ path: "/", breadcrumb: "Projects" },
		{
			path: "/:projectId",
			breadcrumb: DynamicBreadcrumb,
			// @ts-ignore
			props: { name: location.state?.project.name },
		},
		{
			path: "/:projectId/suites/:suiteId",
			breadcrumb: DynamicBreadcrumb,
			// @ts-ignore
			props: { name: location.state?.suite?.name ?? "new" },
		},
	];

	const breadcrumbs = useBreadcrumbs(routes);

	useEffect(() => {
		if (suite) {
			setName(suite.name);
			setCases(suite.cases);
		}
	}, [suite]);

	const createCase = (value: ICase) => {
		setCases([...cases, value]);
	};

	const onCreateSuite = async () => {
		await suiteHandler.mutateAsync({
			name,
			cases,
			project: projectKey ?? "",
		});

		navigate(`/${projectKey}/suites`);
	};

	const onUpdateSuite = async () => {
		await suiteUpdateHandler.mutateAsync({
			_id: suite?._id,
			name,
			cases,
			project: projectKey ?? "",
		});
	};

	const onArchiveSuite = async () => {
		await updateSuite({ _id: suite?._id, isArchive: true });
		navigate(`/${projectKey}/suites`);
	};

	const onDelete = async () => {
		await deleteSuite(suite?._id as string);
		navigate(`/${projectKey}/suites`);
	};

	const onCaseDelete = (idx: number) => {
		const _cases = _.cloneDeep(cases);
		_cases.splice(idx, 1);
		setCases(_cases);
	};

	const onCaseUpdate = (idx: number, title: string) => {
		const _cases = _.cloneDeep(cases);
		_cases[idx].title = title;
		setCases(_cases);
	};

	return (
		<div>
			<Navbar.Horizontal
				breadcrumb={
					<>
						{breadcrumbs.map(({ match, breadcrumb }, idx: number) => (
							<span key={match.pathname} className="text-xs mb-0.5">
								{idx < breadcrumbs.length - 1 ? (
									<>
										<NavLink to={match.pathname} className="hover:text-black">
											{breadcrumb}
										</NavLink>
										&nbsp;/&nbsp;
									</>
								) : (
									breadcrumb
								)}
							</span>
						))}
					</>
				}
				extra={
					<div className="flex items-center gap-2">
						<SaveOrUpdateBtn
							{...{
								suite,
								suiteHandler,
								onCreateSuite,
								onUpdateSuite,
								suiteUpdateHandler,
								name,
							}}
						/>
						{suite?._id ? (
							<ContextMenu
								placement="bottomRight"
								trigger={["click"]}
								menu={
									<Menu
										style={{ width: 150 }}
										items={[
											{
												label: <span className="ml-0.5">Archive</span>,
												key: "archive",
												icon: <PencilIcon className="w-4 h-4" />,
												onClick: onArchiveSuite,
											},
											{
												label: <span className="ml-0.5">Delete</span>,
												key: "delete",
												icon: <TrashIcon className="w-4 h-4" />,
												onClick: onDelete,
											},
										]}
									/>
								}
							>
								<button className="bg-gray-200 hover:bg-gray-300 p-1.5 rounded-lg">
									<Icons.DotHorizontal />
								</button>
							</ContextMenu>
						) : null}
					</div>
				}
			/>
			<input
				placeholder="Untitled"
				value={name}
				className="text-2xl font-medium focus:outline-none mt-1 w-full"
				onChange={(e) => setName(e.target.value)}
			/>
			<Suite
				cases={cases}
				onCreate={createCase}
				onUpdate={onCaseUpdate}
				onDelete={onCaseDelete}
			/>
		</div>
	);
}

const SaveOrUpdateBtn = ({
	suite,
	suiteHandler,
	onCreateSuite,
	onUpdateSuite,
	suiteUpdateHandler,
	name,
}: any) => {
	return !suite ? (
		<Button
			disabled={!name}
			icon={suiteHandler.isLoading ? <Spinner size="sm" light={true} /> : null}
			onClick={onCreateSuite}
		>
			Save changes
		</Button>
	) : (
		<Button
			disabled={!name}
			icon={
				suiteUpdateHandler.isLoading ? <Spinner size="sm" light={true} /> : null
			}
			onClick={onUpdateSuite}
		>
			Update suite
		</Button>
	);
};
