import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { Empty, Menu } from "antd";
import classNames from "classnames";
import { Navbar } from "components";
import { ContextMenu } from "lib";
import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteSuite, updateSuite } from "services/project";
import { ISuite } from "types";

export default function SuiteArchived() {
	const [contextBtnVisible, setContextBtnVisible] = useState(false);
	const [contextMenuVisible, setContextMenuVisible] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { projectKey } = useParams();
	const archivedSuites = useMemo(
		// @ts-ignore
		() => location.state.suites.filter((suite: ISuite) => suite.isArchive),
		[location]
	);

	const onArchiveSuite = async (_id: string) => {
		await updateSuite({ _id, isArchive: false });
		navigate(`/${projectKey}/suites`);
	};

	const onDelete = async (_id: string) => {
		await deleteSuite(_id);
		navigate(`/${projectKey}/suites`);
	};

	return (
		<div>
			<Navbar.Horizontal title="Archived" />
			{archivedSuites.length ? (
				<div className="grid grid-cols-12 gap-6">
					{archivedSuites.map((suite: ISuite) => (
						<div
							key={suite._id}
							className="col-span-2 bg-gray-200 rounded p-5 h-56 flex flex-col justify-end relative"
							onMouseEnter={() => setContextBtnVisible(true)}
							onMouseLeave={() => setContextBtnVisible(false)}
						>
							<span
								className={classNames("absolute top-2 right-2 invisible", {
									"!visible": contextBtnVisible || contextMenuVisible,
								})}
							>
								<ContextMenu
									placement="bottomRight"
									trigger={["click"]}
									onVisibleChange={setContextMenuVisible}
									menu={
										<Menu
											style={{ width: 150 }}
											items={[
												{
													label: <span className="ml-0.5">Archive</span>,
													key: "archive",
													icon: <PencilIcon className="w-4 h-4" />,
													onClick: () => onArchiveSuite(suite._id as string),
												},
												{
													label: <span className="ml-0.5">Delete</span>,
													key: "delete",
													icon: <TrashIcon className="w-4 h-4" />,
													onClick: () => onDelete(suite._id as string),
												},
											]}
										/>
									}
								/>
							</span>
							<h3 className="font-semibold text-lg">{suite.name}</h3>
							<small>{suite.cases?.length} test cases</small>
						</div>
					))}
				</div>
			) : (
				<Empty
					description="No archived suite found"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					className="w-2/3 mt-20"
				/>
			)}
		</div>
	);
}
