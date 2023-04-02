import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Empty, Menu, Spin, Tooltip } from "antd";
import { Navbar } from "components";
import Beta from "components/Beta";
import { Button, ContextMenu } from "lib";
import { Link, useParams } from "react-router-dom";
import releaseService from "services/release";

export default function Releases() {
	const { projectKey } = useParams();
	const { data, isLoading, refetch } = useQuery(["releases", projectKey], () =>
		releaseService.get(projectKey as string)
	);

	const handleDelete = async (id: string) => {
		await releaseService.delete(id);
		refetch();
	};

	return (
		<div>
			<Navbar.Horizontal
				title="Releases"
				extra={<Button href="new">Create new release</Button>}
			/>
			<table className="items-center w-full">
				<colgroup>
					<col span={1} style={{ width: "25%" }} />
					<col span={1} style={{ width: "15%" }} />
					<col span={1} style={{ width: "15%" }} />
					<col span={1} style={{ width: "5%" }} />
				</colgroup>
				<thead className="thead-light">
					<tr>
						<th className="py-3 text-xs font-medium text-left">Project name</th>
						<th className="py-3 text-xs font-medium text-left">Status</th>
						<Beta>
							<th className="py-3 text-xs font-medium text-left">
								Team members
							</th>
						</Beta>
						<th className="py-3 text-xs font-medium text-left"></th>
					</tr>
				</thead>
				<tbody>
					{data?.data.map((item) => (
						<TableRow
							key={item._id}
							{...item}
							onEdit={handleDelete}
							onDelete={handleDelete}
						/>
					))}
				</tbody>
			</table>

			{isLoading ? (
				<Spin className="h-80 w-full flex items-center justify-center" />
			) : data?.data.length === 0 ? (
				<Empty
					description="No releases"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					className="mt-20"
				/>
			) : null}
		</div>
	);
}

type TableRowProps = {
	title: string;
	onEdit: any;
	onDelete: any;
	_id: string;
};

const TableRow = ({ title, onEdit, onDelete, ...props }: TableRowProps) => {
	return (
		<tr>
			<td className="align-middle py-2.5 text-left">
				<Link to={props._id}>
					<span className="text-lg font-semibold">{title}</span>
					<small className="block">TIME-1244 - Ticket title here</small>
				</Link>
			</td>
			<td className="align-middle text-sm py-2.5">
				<div className="flex items-center">
					<Tooltip
						title={<span>13 Passed &bull; 4 Failed &bull; 7 Blocked</span>}
					>
						<div className="overflow-hidden w-2/4 h-2 flex rounded">
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
					</Tooltip>
				</div>
			</td>
			<Beta>
				<td className="align-middle text-sm py-2.5">
					<Avatar.Group>
						{_avatars.map((avatar, idx) => (
							<Avatar key={idx} src={avatar} />
						))}
					</Avatar.Group>
				</td>
			</Beta>
			<td className="align-middle text-base text-right py-2.5">
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
										onClick: () => onEdit(props._id),
									},
									{
										label: <span className="ml-0.5">Delete</span>,
										key: "delete",
										icon: <TrashIcon className="w-4 h-4" />,
										onClick: () => onDelete(props._id),
									},
								]}
							/>
						}
					/>
				</div>
			</td>
		</tr>
	);
};

const _avatars = [
	"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
	"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
	"https://t3.ftcdn.net/jpg/03/67/46/48/360_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg",
];
