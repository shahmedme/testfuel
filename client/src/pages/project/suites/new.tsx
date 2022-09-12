import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useMutation } from "@tanstack/react-query";
import { Menu } from "antd";
import { Icons, Navbar, Suite } from "components";
import { Spinner } from "flowbite-react";
import { Button, ContextMenu } from "lib";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSuite, deleteSuite, updateSuite } from "services/project";
import { ICase, ISuite } from "types";
import _ from "lodash";

export default function SuiteNew({ suite }: { suite?: ISuite }) {
	const [name, setName] = useState("");
	const [cases, setCases] = useState<ICase[]>([]);
	const suiteHandler = useMutation(createSuite);
	const suiteUpdateHandler = useMutation(updateSuite);
	const { projectKey } = useParams();
	const navigate = useNavigate();

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

		navigate(`/p/${projectKey}/suites`);
	};

	const onUpdateSuite = async () => {
		await suiteUpdateHandler.mutateAsync({
			_id: suite?._id,
			name,
			cases,
			project: projectKey ?? "",
		});
	};

	const onDelete = async () => {
		await deleteSuite(suite?._id as string);
		navigate(`/p/${projectKey}/suites`);
	};

	const onCaseDelete = (idx: number) => {
		const _cases = _.cloneDeep(cases);
		_cases.splice(idx, 1);
		setCases(_cases);
	};

	return (
		<div>
			<Navbar.Horizontal
				breadcrumb
				extra={
					<div className="flex items-center gap-2">
						<SaveOrUpdateBtn
							{...{
								suite,
								suiteHandler,
								onCreateSuite,
								onUpdateSuite,
								suiteUpdateHandler,
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
												// onClick: () => onEdit(slug),
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
			{<Suite cases={cases} onCreate={createCase} onDelete={onCaseDelete} />}
		</div>
	);
}

const SaveOrUpdateBtn = ({
	suite,
	suiteHandler,
	onCreateSuite,
	onUpdateSuite,
	suiteUpdateHandler,
}: any) => {
	return !suite ? (
		<Button
			icon={suiteHandler.isLoading ? <Spinner size="sm" light={true} /> : null}
			onClick={onCreateSuite}
		>
			Save changes
		</Button>
	) : (
		<Button
			icon={
				suiteUpdateHandler.isLoading ? <Spinner size="sm" light={true} /> : null
			}
			onClick={onUpdateSuite}
		>
			Update suite
		</Button>
	);
};
